using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RedGranite.Server.Core.Interfaces;
using RedGranite.Server.Core.Models;

namespace RedGranite.Server.Data.Repositories;

public class ItemRepository : IItemRepository
{
    private readonly AppDbContext _dbContext;
    private readonly ILogger<ItemRepository> _logger;

    public ItemRepository(AppDbContext dbContext, ILogger<ItemRepository> logger)
    {
        _dbContext = dbContext;
        _logger = logger;
    }

    public async Task<Item?> GetItemAsync(string id)
    {
        _logger.LogDebug("Querying item with ID: {ItemId}", id);
        return await _dbContext.Items.FirstOrDefaultAsync(item => item.Id == id);
    }

    public async Task<List<Item>> GetItemsAsync(DateTimeOffset? maxDate, int? count)
    {
        const int maxAllowedCount = 500;
        const int defaultCount = 50;

        if (count > maxAllowedCount)
        {
            _logger.LogWarning("Requested count {Count} exceeds maximum of {MaxCount}", count, maxAllowedCount);
            throw new ArgumentException($"Item limit is {maxAllowedCount}", nameof(count));
        }

        var effectiveMaxDate = maxDate ?? new DateTimeOffset(2999, 1, 1, 0, 0, 0, TimeSpan.Zero);
        var effectiveCount = count ?? defaultCount;

        _logger.LogDebug("Querying items with maxDate: {MaxDate}, count: {Count}", effectiveMaxDate, effectiveCount);

        // Filter in database rather than loading all items into memory
        var items = await _dbContext.Items
            .Where(i => i.LastModified < effectiveMaxDate)
            .OrderByDescending(e => e.LastModified)
            .Take(effectiveCount)
            .ToListAsync();

        _logger.LogDebug("Retrieved {Count} items from database", items.Count);
        return items;
    }

    public async Task<Item?> AddItemAsync(Item item)
    {
        _logger.LogDebug("Adding item to database: {ItemName}", item.Name);
        _dbContext.Add(item);
        await _dbContext.SaveChangesAsync();
        _logger.LogDebug("Item added with ID: {ItemId}", item.Id);
        return item;
    }

    public async Task<Item?> UpdateItemAsync(string id, Item item)
    {
        _logger.LogDebug("Updating item in database: {ItemId}", id);
        var savedItem = await _dbContext.Items.FindAsync(id);
        if (savedItem != null)
        {
            savedItem.Update(item.Name, item.ShortDescription, item.LongDescription);
            _dbContext.Update(savedItem);
            await _dbContext.SaveChangesAsync();
            _logger.LogDebug("Item updated: {ItemId}", id);
        }
        return savedItem;
    }

    public async Task DeleteItemAsync(string id)
    {
        _logger.LogDebug("Deleting item from database: {ItemId}", id);
        var savedItem = await _dbContext.Items.FindAsync(id);
        if (savedItem != null)
        {
            _dbContext.Remove(savedItem);
            await _dbContext.SaveChangesAsync();
            _logger.LogDebug("Item deleted: {ItemId}", id);
        }
    }
}
