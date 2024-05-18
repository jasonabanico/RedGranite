using RedGranite.Server.Core;
using RedGranite.Server.Data.Repositories;

namespace RedGranite.Server.GraphQl;

public class Query
{
    private readonly IItemRepository _itemRepository;

    public Query()
    {
        _itemRepository = new ItemRepository();
    }

    public Item GetItem() => _itemRepository.GetItem();
    public List<Item> GetItems() => _itemRepository.GetItems();
}