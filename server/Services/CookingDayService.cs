using Azure.Storage.Blobs;
using Microsoft.EntityFrameworkCore;
using server.Context;
using server.Interfaces;
using server.Models.Db;
using server.Models.DTOs;

namespace server.Services;

public class CookingDayService(CookinUpDbContext context, IConfiguration configuration) : ICookingDayService
{
    public async Task<CookingDayDetailsDto> GetCookingDayDetails(int userId, int cookingDayId)
    {
        var cookingDay = await context.CookingDays
            .Include(cd => cd.Dishes)!
            .ThenInclude(d => d.MealCategory)
            .Include(cd => cd.User)
            .FirstOrDefaultAsync(cd => cd.Id == cookingDayId);

        if (cookingDay == null)
            throw new UnauthorizedAccessException("Brak dostępu do wybranego dnia gotowania.");

        var mealCategories = await context.MealCategories
            .Where(mc => mc.LobbyId == cookingDay.LobbyId)
            .ToListAsync();

        var otherCategories = await context.OtherCategories
            .Where(oc => oc.LobbyId == cookingDay.LobbyId)
            .Select(oc => new OtherCategories
            {
                Id = oc.Id,
                Name = oc.Name
            })
            .ToListAsync();

        var blobConnectionString = configuration["blobContainerCon"];
        var blobServiceClient = new BlobServiceClient(blobConnectionString);
        var containerClient = blobServiceClient.GetBlobContainerClient("cookingday-images");

        var mealCategoryDtos = mealCategories
            .Select(mc => new MealCategoryDto
            {
                Id = mc.Id,
                Name = mc.Name,
                Dishes = cookingDay.Dishes?
                    .Where(d => d.MealCategoryId == mc.Id)
                    .Select(d => new DishDto
                    {
                        Id = d.Id,
                        Name = d.Name,
                        Image = GetDishImageUri(containerClient, cookingDay.Id, cookingDay.UserId, d.Id, d.Image)
                    })
                    .ToList() ?? new List<DishDto>()
            })
            .ToList();

        var userReviews = new List<ReviewDto>();
        if (cookingDay.UserId != userId)
            userReviews = await context.Reviews
                .Where(r => r.UserWhoReviewId == userId &&
                            r.CookingDayId == cookingDayId &&
                            ((r.MealCategoryId != null &&
                              mealCategories.Select(mc => mc.Id).Contains(r.MealCategoryId.Value)) ||
                             (r.OtherCategoryId != null &&
                              otherCategories.Select(oc => oc.Id).Contains(r.OtherCategoryId.Value))))
                .Select(r => new ReviewDto
                {
                    ReviewId = r.Id,
                    Rating = r.Review,
                    Comment = r.Comment ?? "",
                    CategoryId = r.MealCategoryId ?? r.OtherCategoryId ?? 0,
                    CategoryType = r.MealCategoryId != null ? "MealCategory" : "OtherCategory"
                })
                .ToListAsync();

        return new CookingDayDetailsDto
        {
            Id = cookingDay.Id,
            UserId = cookingDay.UserId,
            UserName = cookingDay.User.Name,
            LobbyId = cookingDay.LobbyId,
            Date = cookingDay.Date ?? DateTime.Today,
            isCurrentUser = cookingDay.UserId == userId,
            MealCategories = mealCategoryDtos,
            OtherCategories = otherCategories,
            UserReviews = userReviews
        };
    }


    public async Task<bool> UpdateCookingDay(int cookingDayId, UpdateCookingDayRequestDto request, int userId)
    {
        var cookingDay = await context.CookingDays
            .Include(cd => cd.Dishes)
            .FirstOrDefaultAsync(cd => cd.Id == cookingDayId);

        if (cookingDay == null)
            throw new ArgumentException("Podany CookingDay nie istnieje.");

        if (cookingDay.UserId != userId)
            throw new UnauthorizedAccessException("Nie masz uprawnień do zmiany tego dnia gotowania.");

        if (request.NewDate.HasValue)
            cookingDay.Date = request.NewDate.Value;

        var blobConnectionString = configuration["blobContainerCon"];
        var blobServiceClient = new BlobServiceClient(blobConnectionString);
        var containerClient = blobServiceClient.GetBlobContainerClient("cookin-up-blob");

        if (request.Dishes != null && request.Dishes.Any())
            foreach (var dishRequest in request.Dishes)
            {
                var existingDish = cookingDay.Dishes?.FirstOrDefault(d => d.Id == dishRequest.Id);

                if (existingDish != null)
                {
                    existingDish.Name = dishRequest.Name ?? existingDish.Name;

                    if (!string.IsNullOrEmpty(dishRequest.Image))
                    {
                        var blobName = $"{cookingDayId}_{userId}_{dishRequest.Id}.jpg";
                        var blobClient = containerClient.GetBlobClient(blobName);

                        if (await blobClient.ExistsAsync()) await blobClient.DeleteAsync();

                        var imageData = Convert.FromBase64String(dishRequest.Image);
                        using (var stream = new MemoryStream(imageData))
                        {
                            await blobClient.UploadAsync(stream, true);
                        }

                        existingDish.Image = $"{blobClient.Uri}?t={DateTime.UtcNow.Ticks}";
                    }
                    else
                    {
                        existingDish.Image = dishRequest.Image;
                    }

                    existingDish.MealCategoryId = dishRequest.MealCategoryId ?? existingDish.MealCategoryId;
                }
                else
                {
                    throw new Exception("Danie nie istnieje.");
                }
            }

        await context.SaveChangesAsync();
        return true;
    }


    private string GetDishImageUri(BlobContainerClient containerClient, int cookingDayId, int userId, int dishId,
        string? storedImageName)
    {
        if (string.IsNullOrEmpty(storedImageName)) return string.Empty;
        var blobName = $"{cookingDayId}_{userId}_{dishId}.jpg";

        var blobClient = containerClient.GetBlobClient(blobName);
        if (blobClient.Exists()) return blobClient.Uri.ToString();

        return Uri.IsWellFormedUriString(storedImageName, UriKind.Absolute) ? storedImageName : string.Empty;
    }
}