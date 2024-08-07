﻿using System.ComponentModel.DataAnnotations;

namespace RedGranite.Server.Core.Models;

public class Item
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public DateTimeOffset? CreatedAt { get; set; } = DateTimeOffset.MinValue;
    public DateTimeOffset? UpdatedAt { get; set; } = DateTimeOffset.MinValue;
    public string Name { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string LongDescription { get; set; } = string.Empty;
}
