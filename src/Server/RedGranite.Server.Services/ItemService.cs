using RedGranite.Server.Core.Interfaces;
using RedGranite.Server.Core.Models;

namespace RedGranite.Server.Services;

public class ItemService : IItemService
{
    private readonly IItemRepository _repository;

    public ItemService(IItemRepository itemRepository) =>
        _repository = itemRepository;

    public async Task<Item?> GetItemAsync(string id) =>
        await _repository.GetItemAsync(id);

    public async Task<List<Item>> GetItemsAsync(DateTimeOffset? maxDate, int? count) =>
        await _repository.GetItemsAsync(maxDate, count);

    public async Task<Item?> AddItemAsync(Item item) =>
        await _repository.AddItemAsync(item);

    public async Task<Item?> UpdateItemAsync(string id, Item item) =>
        await _repository.UpdateItemAsync(id, item);

    public async Task DeleteItemAsync(string id) =>
        await _repository.DeleteItemAsync(id);
}
