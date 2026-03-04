using HotChocolate;
using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using RedGranite.Server.Core.Interfaces;
using RedGranite.Server.Core.Models;
using RedGranite.Server.GraphQl;
using RedGranite.Server.Services;

namespace RedGranite.Server.IntegrationTests;

/// <summary>
/// Integration tests for Item GraphQL queries.
/// </summary>
public class ItemQueryIntegrationTests
{
    private async Task<IRequestExecutor> CreateExecutorAsync(IItemRepository? mockRepository = null)
    {
        var services = new ServiceCollection();

        // Register mock repository if provided
        if (mockRepository != null)
        {
            services.AddSingleton(mockRepository);
        }
        else
        {
            services.AddSingleton<IItemRepository, InMemoryItemRepository>();
        }

        services.AddScoped<IItemService, ItemService>();
        services.AddLogging();
        services.AddGraphQl();

        var serviceProvider = services.BuildServiceProvider();
        var executor = await serviceProvider.GetRequiredService<IRequestExecutorResolver>()
            .GetRequestExecutorAsync();

        return executor;
    }

    [Fact]
    public async Task GetItem_WithValidId_ReturnsItem()
    {
        // Arrange
        var repository = new InMemoryItemRepository();
        var item = Item.Create("Test Item", "Short Desc", "Long Description");
        await repository.AddItemAsync(item);

        var executor = await CreateExecutorAsync(repository);

        // Act
        var result = await executor.ExecuteAsync($@"
            query {{
                GetItem(id: ""{item.Id}"") {{
                    id
                    name
                    shortDescription
                    longDescription
                }}
            }}
        ");

        // Assert
        result.ExpectQueryResult();
        var data = result.ToJson();
        data.Should().Contain("Test Item");
        data.Should().Contain("Short Desc");
    }

    [Fact]
    public async Task GetItem_WithInvalidId_ReturnsError()
    {
        // Arrange
        var executor = await CreateExecutorAsync(new InMemoryItemRepository());

        // Act
        var result = await executor.ExecuteAsync(@"
            query {
                GetItem(id: ""non-existent-id"") {
                    id
                    name
                }
            }
        ");

        // Assert
        result.ExpectQueryResult();
        var queryResult = result as IQueryResult;
        queryResult?.Errors.Should().NotBeNullOrEmpty();
    }

    [Fact]
    public async Task GetItems_ReturnsAllItems()
    {
        // Arrange
        var repository = new InMemoryItemRepository();
        await repository.AddItemAsync(Item.Create("Item 1", "Short 1", "Long 1"));
        await repository.AddItemAsync(Item.Create("Item 2", "Short 2", "Long 2"));

        var executor = await CreateExecutorAsync(repository);

        // Act
        var result = await executor.ExecuteAsync(@"
            query {
                GetItems(count: 10) {
                    id
                    name
                }
            }
        ");

        // Assert
        result.ExpectQueryResult();
        var data = result.ToJson();
        data.Should().Contain("Item 1");
        data.Should().Contain("Item 2");
    }
}

/// <summary>
/// In-memory implementation of IItemRepository for testing.
/// </summary>
public class InMemoryItemRepository : IItemRepository
{
    private readonly List<Item> _items = new();

    public Task<Item?> GetItemAsync(string id)
    {
        var item = _items.FirstOrDefault(i => i.Id == id);
        return Task.FromResult(item);
    }

    public Task<List<Item>> GetItemsAsync(DateTimeOffset? maxDate, int? count)
    {
        var effectiveMaxDate = maxDate ?? DateTimeOffset.MaxValue;
        var effectiveCount = count ?? 50;

        var items = _items
            .Where(i => i.LastModified < effectiveMaxDate)
            .OrderByDescending(i => i.LastModified)
            .Take(effectiveCount)
            .ToList();

        return Task.FromResult(items);
    }

    public Task<Item?> AddItemAsync(Item item)
    {
        _items.Add(item);
        return Task.FromResult<Item?>(item);
    }

    public Task<Item?> UpdateItemAsync(string id, Item item)
    {
        var existingItem = _items.FirstOrDefault(i => i.Id == id);
        if (existingItem != null)
        {
            existingItem.Update(item.Name, item.ShortDescription, item.LongDescription);
        }
        return Task.FromResult(existingItem);
    }

    public Task DeleteItemAsync(string id)
    {
        var item = _items.FirstOrDefault(i => i.Id == id);
        if (item != null)
        {
            _items.Remove(item);
        }
        return Task.CompletedTask;
    }
}
