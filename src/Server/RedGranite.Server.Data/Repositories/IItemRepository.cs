using RedGranite.Server.Core;

namespace RedGranite.Server.Data.Repositories;

public interface IItemRepository
{
    Item GetItem();
    List<Item> GetItems();
}
