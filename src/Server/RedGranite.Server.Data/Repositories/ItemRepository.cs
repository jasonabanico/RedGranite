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
}