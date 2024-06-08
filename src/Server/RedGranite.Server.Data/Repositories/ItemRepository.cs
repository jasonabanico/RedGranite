using RedGranite.Server.Core;

namespace RedGranite.Server.Data.Repositories;

public class ItemRepository : IItemRepository
{
    private Dictionary<string, Item> _items;

    public ItemRepository()
    {
        _items = CreateItems(10);
    }

    private Dictionary<string, Item> CreateItems(int count)
    {
        // create fake items
        var items = new Dictionary<string, Item>();
        for (int i = 0; i < count; i++)
        {
            var id = Guid.NewGuid().ToString();
            var item = new Item()
            {
                Id = id,
                Name = $"Item #{i}",
                Description = $"This is Item {i} with Id {id}"
            };
            items.Add(id, item);
        }

        return items;
    }

    public Item GetItem(string id)
    {
        return _items[id];
    }

    public List<Item> GetItems(int page, int perPage)
    {
        var list = _items.Values.ToList();
        int skip = (page - 1) * perPage;
        return list.Skip(skip).Take(perPage).ToList();
    }
}