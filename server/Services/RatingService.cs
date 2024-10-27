using Microsoft.EntityFrameworkCore;
using server.Context;
using server.Interfaces;
using server.Models.Db;
using server.Models.DTOs;

namespace server.Services;

public class RatingService : IRatingService
{
    private readonly CookinUpDbContext _context;

    public RatingService(CookinUpDbContext context)
    {
        _context = context;
    }

    public async Task<LobbyRatingsSummaryDto> GetLobbyRatingsSummary(int lobbyId)
    {
        var lobby = await _context.Lobbies
            .Include(l => l.CreatedByUser)
            .Include(l => l.UsersInLobbies)
            .ThenInclude(ul => ul.User)
            .Include(l => l.MealCategories)
            .Include(l => l.OtherCategories)
            .FirstOrDefaultAsync(l => l.Id == lobbyId);

        if (lobby == null)
            throw new ArgumentException("Lobby nie zostało znalezione.");

        var usersInLobby = lobby.UsersInLobbies
            .Select(ul => ul.User)
            .Where(u => u != null)
            .Append(lobby.CreatedByUser)
            .ToList();

        var mealCategories = lobby.MealCategories.ToList();
        var otherCategories = lobby.OtherCategories.ToList();

        var expectedReviewCount = (mealCategories.Count + otherCategories.Count) * usersInLobby.Count *
                                  (usersInLobby.Count - 1);

        var actualReviewCount = await _context.Reviews
            .CountAsync(r => r.LobbyId == lobbyId);

        var allReviewsSubmitted = actualReviewCount == expectedReviewCount;

        if (!allReviewsSubmitted)
            throw new InvalidOperationException("Nie wszystkie oceny zostały jeszcze wystawione.");

        var reviews = await _context.Reviews
            .Where(r => r.LobbyId == lobbyId)
            .ToListAsync();

        var userRatingsSummary = usersInLobby.Select(user => new UserRatingSummaryDto
        {
            UserId = user.Id,
            UserName = user.Name,
            MealCategoryRatings = mealCategories.Select(mealCategory => new CategoryAverageDto
            {
                CategoryId = mealCategory.Id,
                CategoryName = mealCategory.Name,
                AverageRating = reviews
                    .Where(r => r.UserWhoReviewId == user.Id && r.MealCategoryId == mealCategory.Id)
                    .Average(r => (double?)r.Review) ?? 0
            }).ToList(),
            OtherCategoryRatings = otherCategories.Select(otherCategory => new CategoryAverageDto
            {
                CategoryId = otherCategory.Id,
                CategoryName = otherCategory.Name,
                AverageRating = reviews
                    .Where(r => r.UserWhoReviewId == user.Id && r.OtherCategoryId == otherCategory.Id)
                    .Average(r => (double?)r.Review) ?? 0
            }).ToList()
        }).ToList();

        return new LobbyRatingsSummaryDto
        {
            LobbyId = lobbyId,
            UserRatings = userRatingsSummary
        };
    }


    public async Task<bool> RateCategory(RateCategoryRequestDto rateCategoryRequest, int requestingUserId)
    {
        if (rateCategoryRequest.Rating < 0 || rateCategoryRequest.Rating > 10)
            throw new ArgumentException("Ocena musi mieścić się w zakresie od 0 do 10.");

        Reviews existingReview;

        if (rateCategoryRequest.CategoryType == "meal")
        {
            var mealCategory = await _context.MealCategories.FindAsync(rateCategoryRequest.CategoryId);
            if (mealCategory == null)
                throw new ArgumentException("Kategoria posiłków nie została znaleziona.");

            existingReview = await _context.Reviews.FirstOrDefaultAsync(r =>
                r.UserWhoReviewId == requestingUserId &&
                r.MealCategoryId == rateCategoryRequest.CategoryId &&
                r.CookingDayId == rateCategoryRequest.CookingDayId);

            if (existingReview == null)
            {
                existingReview = new Reviews
                {
                    MealCategoryId = rateCategoryRequest.CategoryId,
                    UserWhoReviewId = requestingUserId,
                    Review = rateCategoryRequest.Rating,
                    LobbyId = rateCategoryRequest.LobbyId,
                    CookingDayId = rateCategoryRequest.CookingDayId
                };
                _context.Reviews.Add(existingReview);
            }
            else
            {
                existingReview.Review = rateCategoryRequest.Rating;
                _context.Reviews.Update(existingReview);
            }
        }
        else if (rateCategoryRequest.CategoryType == "other")
        {
            var otherCategory = await _context.OtherCategories.FindAsync(rateCategoryRequest.CategoryId);
            if (otherCategory == null)
                throw new ArgumentException("Inna kategoria nie została znaleziona.");

            existingReview = await _context.Reviews.FirstOrDefaultAsync(r =>
                r.UserWhoReviewId == requestingUserId &&
                r.OtherCategoryId == rateCategoryRequest.CategoryId &&
                r.CookingDayId == rateCategoryRequest.CookingDayId);

            if (existingReview == null)
            {
                existingReview = new Reviews
                {
                    OtherCategoryId = rateCategoryRequest.CategoryId,
                    UserWhoReviewId = requestingUserId,
                    Review = rateCategoryRequest.Rating,
                    LobbyId = rateCategoryRequest.LobbyId,
                    CookingDayId = rateCategoryRequest.CookingDayId
                };
                _context.Reviews.Add(existingReview);
            }
            else
            {
                existingReview.Review = rateCategoryRequest.Rating;
                _context.Reviews.Update(existingReview);
            }
        }
        else
        {
            throw new ArgumentException("Nieprawidłowy typ kategorii.");
        }

        await _context.SaveChangesAsync();

        return true;
    }
}