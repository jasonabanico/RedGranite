using RedGranite.Server.Core.Interfaces;
using RedGranite.Server.Core.Models;

namespace RedGranite.Server.Cosmos.Repositories;

public class ItemRepository : IItemRepository
{
    public void AddItem(Item item)
    {
        throw new NotImplementedException();
    }

    public Item GetItem(string id)
    {
        throw new NotImplementedException();
    }

    public List<Item> GetItems(int page, int perPage)
    {
        throw new NotImplementedException();
    }
}
