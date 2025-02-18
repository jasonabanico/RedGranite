using Microsoft.EntityFrameworkCore;
using RedGranite.Server.Core.Interfaces;
using RedGranite.Server.Core.Models;

namespace RedGranite.Server.Cosmos.Repositories;

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

    public async Task AddItemAsync(Item item)
    {
        item.CreatedAt = DateTime.UtcNow;
        item.UpdatedAt = DateTime.UtcNow;
        _dbContext.Add(item);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<Item> GetItemAsync(string id)
    {
        return await _dbContext.Items.FirstOrDefaultAsync(item => item.Id == id) ?? new Item();
    }

    public async Task<List<Item>> GetItemsAsync(DateTimeOffset? maxDate, int? count)
    {
        var items = await _dbContext.Items.ToListAsync();

        if (count > 500)
            throw new ArgumentException("Item limit is 500");

        maxDate = maxDate ?? new DateTimeOffset(2999, 1, 1, 0, 0, 0, TimeSpan.Zero);
        return items
            .Where(i => i.UpdatedAt < maxDate)
            .OrderByDescending(e => e.UpdatedAt)
            .Take(count ?? 50)
            .ToList();
    }
}
