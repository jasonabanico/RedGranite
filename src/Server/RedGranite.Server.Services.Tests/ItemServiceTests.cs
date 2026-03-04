using Microsoft.Extensions.Logging;
using RedGranite.Server.Core.Exceptions;
using RedGranite.Server.Core.Interfaces;
using RedGranite.Server.Core.Models;
using RedGranite.Server.Services;

namespace RedGranite.Server.Services.Tests;

public class ItemServiceTests
{
    private readonly Mock<IItemRepository> _mockRepository;
    private readonly Mock<ILogger<ItemService>> _mockLogger;
    private readonly ItemService _service;

    public ItemServiceTests()
    {
        _mockRepository = new Mock<IItemRepository>();
        _mockLogger = new Mock<ILogger<ItemService>>();
        _service = new ItemService(_mockRepository.Object, _mockLogger.Object);
    }

    [Fact]
    public async Task GetItemAsync_WhenItemExists_ReturnsItem()
    {
        // Arrange
        var itemId = "test-id";
        var expectedItem = Item.Create("Test", "Short", "Long");
        _mockRepository.Setup(r => r.GetItemAsync(itemId))
            .ReturnsAsync(expectedItem);

        // Act
        var result = await _service.GetItemAsync(itemId);

        // Assert
        result.Should().NotBeNull();
        result.Should().Be(expectedItem);
        _mockRepository.Verify(r => r.GetItemAsync(itemId), Times.Once);
    }

    [Fact]
    public async Task GetItemAsync_WhenItemNotFound_ThrowsNotFoundException()
    {
        // Arrange
        var itemId = "non-existent-id";
        _mockRepository.Setup(r => r.GetItemAsync(itemId))
            .ReturnsAsync((Item?)null);

        // Act
        var act = async () => await _service.GetItemAsync(itemId);

        // Assert
        await act.Should().ThrowAsync<NotFoundException>()
            .Where(e => e.EntityType == nameof(Item) && e.EntityId == itemId);
    }

    [Fact]
    public async Task GetItemsAsync_ReturnsItemsFromRepository()
    {
        // Arrange
        var maxDate = DateTimeOffset.UtcNow;
        var count = 10;
        var expectedItems = new List<Item>
        {
            Item.Create("Item 1", "Short 1", "Long 1"),
            Item.Create("Item 2", "Short 2", "Long 2"),
        };
        _mockRepository.Setup(r => r.GetItemsAsync(maxDate, count))
            .ReturnsAsync(expectedItems);

        // Act
        var result = await _service.GetItemsAsync(maxDate, count);

        // Assert
        result.Should().HaveCount(2);
        result.Should().BeEquivalentTo(expectedItems);
    }

    [Fact]
    public async Task AddItemAsync_CallsRepository()
    {
        // Arrange
        var item = Item.Create("New Item", "Short", "Long");
        _mockRepository.Setup(r => r.AddItemAsync(item))
            .ReturnsAsync(item);

        // Act
        var result = await _service.AddItemAsync(item);

        // Assert
        result.Should().Be(item);
        _mockRepository.Verify(r => r.AddItemAsync(item), Times.Once);
    }

    [Fact]
    public async Task UpdateItemAsync_WhenItemExists_UpdatesItem()
    {
        // Arrange
        var itemId = "existing-id";
        var existingItem = Item.Create("Original", "Original Short", "Original Long");
        var updateItem = Item.Create("Updated", "Updated Short", "Updated Long");
        
        _mockRepository.Setup(r => r.GetItemAsync(itemId))
            .ReturnsAsync(existingItem);
        _mockRepository.Setup(r => r.UpdateItemAsync(itemId, updateItem))
            .ReturnsAsync(existingItem);

        // Act
        var result = await _service.UpdateItemAsync(itemId, updateItem);

        // Assert
        result.Should().NotBeNull();
        _mockRepository.Verify(r => r.UpdateItemAsync(itemId, updateItem), Times.Once);
    }

    [Fact]
    public async Task UpdateItemAsync_WhenItemNotFound_ThrowsNotFoundException()
    {
        // Arrange
        var itemId = "non-existent-id";
        var updateItem = Item.Create("Updated", "Updated Short", "Updated Long");
        
        _mockRepository.Setup(r => r.GetItemAsync(itemId))
            .ReturnsAsync((Item?)null);

        // Act
        var act = async () => await _service.UpdateItemAsync(itemId, updateItem);

        // Assert
        await act.Should().ThrowAsync<NotFoundException>();
        _mockRepository.Verify(r => r.UpdateItemAsync(It.IsAny<string>(), It.IsAny<Item>()), Times.Never);
    }

    [Fact]
    public async Task DeleteItemAsync_WhenItemExists_DeletesItem()
    {
        // Arrange
        var itemId = "existing-id";
        var existingItem = Item.Create("Item to Delete", "Short", "Long");
        
        _mockRepository.Setup(r => r.GetItemAsync(itemId))
            .ReturnsAsync(existingItem);
        _mockRepository.Setup(r => r.DeleteItemAsync(itemId))
            .Returns(Task.CompletedTask);

        // Act
        await _service.DeleteItemAsync(itemId);

        // Assert
        _mockRepository.Verify(r => r.DeleteItemAsync(itemId), Times.Once);
    }

    [Fact]
    public async Task DeleteItemAsync_WhenItemNotFound_ThrowsNotFoundException()
    {
        // Arrange
        var itemId = "non-existent-id";
        
        _mockRepository.Setup(r => r.GetItemAsync(itemId))
            .ReturnsAsync((Item?)null);

        // Act
        var act = async () => await _service.DeleteItemAsync(itemId);

        // Assert
        await act.Should().ThrowAsync<NotFoundException>();
        _mockRepository.Verify(r => r.DeleteItemAsync(It.IsAny<string>()), Times.Never);
    }
}
