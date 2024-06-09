using RedGranite.Server.Core.Models;

namespace RedGranite.Server.Core.Interfaces;

public interface IItemRepository
{
    Item GetItem(string id);
    List<Item> GetItems(int page, int perPage);
    void AddItem(Item item);
}
