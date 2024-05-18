using RedGranite.Server.Core;

namespace RedGranite.Server.Data.Repositories;

public class ItemRepository : IItemRepository
{
    public Item GetItem()
    {
        return new Item()
        {
            Name = "Item",
            Description = "Description"
        };
    }

    public List<Item> GetItems()
    {
        var items = new List<Item>();
        for (int i = 0; i <= 5; i++)
        {
            var item = new Item()
            {
                Name = $"Item-{i}",
                Description = $"Description #{i}"
            };
            items.Add(item);
        }
        return items;
    }
}