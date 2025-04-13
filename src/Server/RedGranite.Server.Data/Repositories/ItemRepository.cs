using Microsoft.EntityFrameworkCore;
using RedGranite.Server.Core.Interfaces;
using RedGranite.Server.Core.Models;

namespace RedGranite.Server.Data.Repositories;

public class ItemRepository : IItemRepository
{
    private readonly AppDbContext _dbContext;
    private static bool _ensureCreated { get; set; } = false;

    public ItemRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;

        if (!_ensureCreated)
        {
            _dbContext.Database.EnsureCreated();
            _ensureCreated = true;
        }
    }

    public async Task<Item?> GetItemAsync(string id)
    {
        return await _dbContext.Items.FirstOrDefaultAsync(item => item.Id == id);
    }

    public async Task<List<Item>> GetItemsAsync(DateTimeOffset? maxDate, int? count)
    {
        var items = await _dbContext.Items.ToListAsync();

        if (count > 500)
            throw new ArgumentException("Item limit is 500");

        maxDate = maxDate ?? new DateTimeOffset(2999, 1, 1, 0, 0, 0, TimeSpan.Zero);
        return items
            .Where(i => i.LastModified < maxDate)
            .OrderByDescending(e => e.LastModified)
            .Take(count ?? 50)
            .ToList();
    }

    public async Task<Item?> AddItemAsync(Item item)
    {
        _dbContext.Add(item);
        await _dbContext.SaveChangesAsync();
        return item;
    }

    public async Task<Item?> UpdateItemAsync(string id, Item item)
    {
        var savedItem = await _dbContext.Items.FindAsync(id);
        if (savedItem != null)
        {
            savedItem.Update(item.Name, item.ShortDescription, item.LongDescription);
            _dbContext.Update(savedItem);
            await _dbContext.SaveChangesAsync();
        }
        return savedItem;
    }

    public async Task DeleteItemAsync(string id)
    {
        var savedItem = await _dbContext.Items.FindAsync(id);
        if (savedItem != null)
        {
            _dbContext.Remove(savedItem);
            await _dbContext.SaveChangesAsync();
        }
    }
}
