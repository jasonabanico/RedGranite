using Microsoft.EntityFrameworkCore;
using RedGranite.Server.Core.Models;

namespace RedGranite.Server.Cosmos
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Item> Items { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Item>()
                .HasIndex(e => e.CreatedAt);

            modelBuilder.Entity<Item>()
                .HasIndex(e => e.UpdatedAt);
        }
    }
}
