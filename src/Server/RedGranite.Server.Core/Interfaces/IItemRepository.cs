﻿using RedGranite.Server.Core.Models;

namespace RedGranite.Server.Core.Interfaces;

public interface IItemRepository
{
    Task<Item> GetItemAsync(string id);
    Task<List<Item>> GetItemsAsync(DateTimeOffset? maxDate, int? count);
    Task AddItemAsync(Item item);
    Task UpdateItemAsync(Item item);
}
