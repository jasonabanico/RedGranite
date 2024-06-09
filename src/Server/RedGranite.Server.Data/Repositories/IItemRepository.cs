using RedGranite.Server.Core;

namespace RedGranite.Server.Data.Repositories;

public interface IItemRepository
{
    Item GetItem(string id);
    List<Item> GetItems(int page, int perPage);
    void AddItem(Item item);
}
