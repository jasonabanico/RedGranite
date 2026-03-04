using RedGranite.Server.Core.Models;

namespace RedGranite.Server.Core.Tests.Models;

public class ItemTests
{
    [Fact]
    public void Create_WithValidInputs_ReturnsItem()
    {
        // Arrange
        var name = "Test Item";
        var shortDescription = "Short description";
        var longDescription = "Long description for the test item";

        // Act
        var item = Item.Create(name, shortDescription, longDescription);

        // Assert
        item.Should().NotBeNull();
        item.Name.Should().Be(name);
        item.ShortDescription.Should().Be(shortDescription);
        item.LongDescription.Should().Be(longDescription);
        item.Id.Should().NotBeNullOrEmpty();
        item.Created.Should().BeCloseTo(DateTimeOffset.UtcNow, TimeSpan.FromSeconds(5));
        item.LastModified.Should().BeCloseTo(DateTimeOffset.UtcNow, TimeSpan.FromSeconds(5));
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void Create_WithInvalidName_ThrowsArgumentException(string? invalidName)
    {
        // Arrange
        var shortDescription = "Short description";
        var longDescription = "Long description";

        // Act
        var act = () => Item.Create(invalidName!, shortDescription, longDescription);

        // Assert
        act.Should().Throw<ArgumentException>()
            .WithParameterName("name");
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void Create_WithInvalidShortDescription_ThrowsArgumentException(string? invalidShortDescription)
    {
        // Arrange
        var name = "Test Item";
        var longDescription = "Long description";

        // Act
        var act = () => Item.Create(name, invalidShortDescription!, longDescription);

        // Assert
        act.Should().Throw<ArgumentException>()
            .WithParameterName("shortDescription");
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void Create_WithInvalidLongDescription_ThrowsArgumentException(string? invalidLongDescription)
    {
        // Arrange
        var name = "Test Item";
        var shortDescription = "Short description";

        // Act
        var act = () => Item.Create(name, shortDescription, invalidLongDescription!);

        // Assert
        act.Should().Throw<ArgumentException>()
            .WithParameterName("longDescription");
    }

    [Fact]
    public void Update_WithValidInputs_UpdatesItem()
    {
        // Arrange
        var item = Item.Create("Original Name", "Original Short", "Original Long");
        var originalLastModified = item.LastModified;
        
        // Wait briefly to ensure LastModified changes
        Thread.Sleep(10);

        // Act
        item.Update("Updated Name", "Updated Short", "Updated Long");

        // Assert
        item.Name.Should().Be("Updated Name");
        item.ShortDescription.Should().Be("Updated Short");
        item.LongDescription.Should().Be("Updated Long");
        item.LastModified.Should().BeAfter(originalLastModified);
    }

    [Fact]
    public void Update_WithInvalidName_ThrowsArgumentException()
    {
        // Arrange
        var item = Item.Create("Original Name", "Original Short", "Original Long");

        // Act
        var act = () => item.Update("", "Updated Short", "Updated Long");

        // Assert
        act.Should().Throw<ArgumentException>()
            .WithParameterName("name");
    }
}
