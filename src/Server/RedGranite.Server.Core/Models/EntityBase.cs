using System.ComponentModel.DataAnnotations;

namespace RedGranite.Server.Core.Models;

public abstract class EntityBase
{
    [Key]
    public string Id { get; init; } = Guid.NewGuid().ToString();
    public DateTimeOffset Created { get; init; } = DateTimeOffset.UtcNow;

    private DateTimeOffset _lastModified = DateTimeOffset.UtcNow;
    public DateTimeOffset LastModified
    {
        get => _lastModified;
        init => _lastModified = value;
    }

    protected EntityBase() { } // for deserialization

    public void UpdateLastModified()
    {
        _lastModified = DateTimeOffset.UtcNow;
    }
}