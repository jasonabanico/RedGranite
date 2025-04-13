using Microsoft.EntityFrameworkCore;
using RedGranite.Server.Core.Models;

namespace RedGranite.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Item> Items { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Item>()
                .HasIndex(e => e.Created);

            modelBuilder.Entity<Item>()
                .HasIndex(e => e.LastModified);
        }
    }
}
