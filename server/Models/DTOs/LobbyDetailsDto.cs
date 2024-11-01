﻿using server.Models.Db;

namespace server.Models.DTOs;

public class LobbyDetailsDto
{
    public int LobbyId { get; set; }
    public string Name { get; set; }
    public List<UserDto> Users { get; set; }
    public List<BlacklistDto> Blacklist { get; set; }

    public bool IsOwner { get; set; }
    public List<OtherCategories> OtherCategories { get; set; }
    public List<MealCategories> MealCategories { get; set; }
    public bool AllReviewsSubmitted { get; set; }
}