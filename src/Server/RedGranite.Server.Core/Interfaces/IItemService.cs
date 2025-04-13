using RedGranite.Server.Core.Models;

namespace RedGranite.Server.Core.Interfaces;

public interface IItemService
{
    Task<Item?> GetItemAsync(string id);
    Task<List<Item>> GetItemsAsync(DateTimeOffset? maxDate, int? count);
    Task<Item?> AddItemAsync(Item item);
    Task<Item?> UpdateItemAsync(string id, Item item);
    Task DeleteItemAsync(string id);
}
