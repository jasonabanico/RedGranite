using RedGranite.Server.Core;
using RedGranite.Server.Data.Repositories;

namespace RedGranite.Server.GraphQl;

public class ItemQuery
{
    private readonly IItemRepository _itemRepository;

    public ItemQuery()
    {
        _itemRepository = new ItemRepository();
    }

    public Item GetItem(string id) => _itemRepository.GetItem(id);
    public List<Item> GetItems(int page, int perPage) => _itemRepository.GetItems(page, perPage);
}