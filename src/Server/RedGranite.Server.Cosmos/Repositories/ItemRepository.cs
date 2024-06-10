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
        _dbContext.Add(item);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<Item> GetItemAsync(string id)
    {
        return await _dbContext.Items.FirstOrDefaultAsync(item => item.Id == id) ?? new Item();
    }

    public async Task<List<Item>> GetItemsAsync(int page, int perPage)
    {
        var items = await _dbContext.Items.ToListAsync();

        return items
            .Skip((page - 1) * perPage)
            .Take(perPage)
            .ToList();
    }
}
