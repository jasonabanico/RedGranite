using Microsoft.Extensions.Logging;
using RedGranite.Server.Core.Exceptions;
using RedGranite.Server.Core.Interfaces;
using RedGranite.Server.Core.Models;

namespace RedGranite.Server.Services;

public class ItemService : IItemService
{
    private readonly IItemRepository _repository;
    private readonly ILogger<ItemService> _logger;

    public ItemService(IItemRepository itemRepository, ILogger<ItemService> logger)
    {
        _repository = itemRepository;
        _logger = logger;
    }

    public async Task<Item?> GetItemAsync(string id)
    {
        _logger.LogDebug("Getting item with ID: {ItemId}", id);
        
        var item = await _repository.GetItemAsync(id);
        
        if (item is null)
        {
            _logger.LogWarning("Item not found: {ItemId}", id);
            throw new NotFoundException(nameof(Item), id);
        }
        
        return item;
    }

    public async Task<List<Item>> GetItemsAsync(DateTimeOffset? maxDate, int? count)
    {
        _logger.LogDebug("Getting items with maxDate: {MaxDate}, count: {Count}", maxDate, count);
        
        var items = await _repository.GetItemsAsync(maxDate, count);
        
        _logger.LogDebug("Retrieved {Count} items", items.Count);
        return items;
    }

    public async Task<Item?> AddItemAsync(Item item)
    {
        _logger.LogInformation("Adding new item: {ItemName}", item.Name);
        
        var result = await _repository.AddItemAsync(item);
        
        _logger.LogInformation("Successfully added item with ID: {ItemId}", result?.Id);
        return result;
    }

    public async Task<Item?> UpdateItemAsync(string id, Item item)
    {
        _logger.LogInformation("Updating item: {ItemId}", id);
        
        // Verify item exists first
        var existingItem = await _repository.GetItemAsync(id);
        if (existingItem is null)
        {
            _logger.LogWarning("Cannot update - item not found: {ItemId}", id);
            throw new NotFoundException(nameof(Item), id);
        }
        
        var result = await _repository.UpdateItemAsync(id, item);
        
        _logger.LogInformation("Successfully updated item: {ItemId}", id);
        return result;
    }

    public async Task DeleteItemAsync(string id)
    {
        _logger.LogInformation("Deleting item: {ItemId}", id);
        
        // Verify item exists first
        var existingItem = await _repository.GetItemAsync(id);
        if (existingItem is null)
        {
            _logger.LogWarning("Cannot delete - item not found: {ItemId}", id);
            throw new NotFoundException(nameof(Item), id);
        }
        
        await _repository.DeleteItemAsync(id);
        
        _logger.LogInformation("Successfully deleted item: {ItemId}", id);
    }
}
