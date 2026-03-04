using HotChocolate;
using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using RedGranite.Server.Core.Interfaces;
using RedGranite.Server.Core.Models;
using RedGranite.Server.GraphQl.Errors;
using RedGranite.Server.GraphQl.Types;
using RedGranite.Server.GraphQl.Validators;
using RedGranite.Server.Services;

namespace RedGranite.Server.IntegrationTests;

/// <summary>
/// Integration tests for Item mutations via direct service invocation.
/// These tests verify the business logic and validation without the complexity
/// of [UseServiceScope] in GraphQL mutations.
/// </summary>
public class ItemMutationIntegrationTests
{
    private (IItemService service, InMemoryItemRepository repository) CreateServices()
    {
        var repository = new InMemoryItemRepository();
        var loggerFactory = LoggerFactory.Create(builder => builder.AddConsole());
        var service = new ItemService(repository, loggerFactory.CreateLogger<ItemService>());
        return (service, repository);
    }

    [Fact]
    public async Task AddItem_WithValidInput_CreatesItem()
    {
        // Arrange
        var (service, repository) = CreateServices();
        var input = new ItemInput
        {
            Id = "",
            Name = "New Item",
            ShortDescription = "Short Description",
            LongDescription = "This is a long description for the new item"
        };

        // Validate input
        var validator = new ItemInputValidator();
        var validationResult = await validator.ValidateAsync(input);
        validationResult.IsValid.Should().BeTrue();

        // Act
        var newItem = Item.Create(input.Name, input.ShortDescription, input.LongDescription);
        var result = await service.AddItemAsync(newItem);

        // Assert
        result.Should().NotBeNull();
        result!.Name.Should().Be("New Item");
        result.ShortDescription.Should().Be("Short Description");

        // Verify item was added to repository
        var items = await repository.GetItemsAsync(null, 10);
        items.Should().HaveCount(1);
        items[0].Name.Should().Be("New Item");
    }

    [Fact]
    public async Task AddItem_WithEmptyName_FailsValidation()
    {
        // Arrange
        var input = new ItemInput
        {
            Id = "",
            Name = "",
            ShortDescription = "Short",
            LongDescription = "Long"
        };

        // Act
        var validator = new ItemInputValidator();
        var validationResult = await validator.ValidateAsync(input);

        // Assert
        validationResult.IsValid.Should().BeFalse();
        validationResult.Errors.Should().Contain(e => e.PropertyName == "Name");
    }

    [Fact]
    public async Task UpdateItem_WithValidInput_UpdatesItem()
    {
        // Arrange
        var (service, repository) = CreateServices();
        var item = Item.Create("Original Name", "Original Short", "Original Long");
        await repository.AddItemAsync(item);

        var input = new ItemInput
        {
            Id = item.Id,
            Name = "Updated Name",
            ShortDescription = "Updated Short",
            LongDescription = "Updated Long Description"
        };

        // Validate input
        var validator = new ItemInputUpdateValidator();
        var validationResult = await validator.ValidateAsync(input);
        validationResult.IsValid.Should().BeTrue();

        // Act
        var updatedItem = Item.Create(input.Name, input.ShortDescription, input.LongDescription);
        var result = await service.UpdateItemAsync(item.Id, updatedItem);

        // Assert
        result.Should().NotBeNull();
        result!.Name.Should().Be("Updated Name");

        // Verify item was updated in repository
        var storedItem = await repository.GetItemAsync(item.Id);
        storedItem?.Name.Should().Be("Updated Name");
    }

    [Fact]
    public async Task UpdateItem_WithEmptyId_FailsValidation()
    {
        // Arrange
        var input = new ItemInput
        {
            Id = "",
            Name = "Updated Name",
            ShortDescription = "Updated Short",
            LongDescription = "Updated Long Description"
        };

        // Act
        var validator = new ItemInputUpdateValidator();
        var validationResult = await validator.ValidateAsync(input);

        // Assert
        validationResult.IsValid.Should().BeFalse();
        validationResult.Errors.Should().Contain(e => e.PropertyName == "Id");
    }

    [Fact]
    public async Task DeleteItem_WithValidId_DeletesItem()
    {
        // Arrange
        var (service, repository) = CreateServices();
        var item = Item.Create("To Delete", "Short", "Long");
        await repository.AddItemAsync(item);

        // Verify item exists
        var existingItems = await repository.GetItemsAsync(null, 10);
        existingItems.Should().HaveCount(1);

        // Act
        await service.DeleteItemAsync(item.Id);

        // Assert - Verify item was deleted from repository
        var items = await repository.GetItemsAsync(null, 10);
        items.Should().BeEmpty();
    }

    [Fact]
    public async Task DeleteItem_WithNonExistentId_ThrowsNotFoundException()
    {
        // Arrange
        var (service, _) = CreateServices();

        // Act & Assert
        var action = () => service.DeleteItemAsync("non-existent-id");
        await action.Should().ThrowAsync<RedGranite.Server.Core.Exceptions.NotFoundException>();
    }
}
