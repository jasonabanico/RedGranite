using HotChocolate;
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

    [GraphQLName("GetItem")]
    public Item GetItem(string id) => _itemRepository.GetItem(id);

    [GraphQLName("GetItems")]
    public List<Item> GetItems(int page, int perPage) => _itemRepository.GetItems(page, perPage);
}