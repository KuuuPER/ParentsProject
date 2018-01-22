using Microsoft.EntityFrameworkCore;
using Domain.Models;

namespace Domain.Contexts
{
    public class AppDbContext : DbContext
    {
        public DbSet<Provider> Providers { get; set; }

        public DbSet<Delivery> Deliveries { get; set; }

        public DbSet<Manufacture> Manufactures { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<ProductCategory> ProductCategories { get; set; }

        public DbSet<ProductUnit> ProductUnits { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region Provider
            modelBuilder.Entity<Provider>()
                .HasKey(p => p.Id);

            modelBuilder.Entity<Provider>()
                .Property(p => p.Name)
                .IsRequired();

            modelBuilder.Entity<Provider>()
                .Property(p => p.Address)
                .IsRequired();

            modelBuilder.Entity<Provider>()
                .Property(p => p.Phone)
                .IsRequired();

            modelBuilder.Entity<Provider>()
                .HasMany(p => p.Deliveries)
                .WithOne(d => d.Provider)
                .HasForeignKey(p => p.ProviderId);
            #endregion

            #region Delivery
            modelBuilder.Entity<Delivery>()
                .HasKey(p => p.Id);

            modelBuilder.Entity<Delivery>()
                .HasMany(p => p.ProductUnits)
                .WithOne();

            modelBuilder.Entity<Delivery>()
                .Property(d => d.CreatedDate)
                .ValueGeneratedOnAdd();
            #endregion

            #region Product
            modelBuilder.Entity<Product>()
                .HasKey(p => p.Id);

            modelBuilder.Entity<Product>()
                .Property(p => p.Name)
                .IsRequired();

            modelBuilder.Entity<Product>()
                .Property(p => p.VendorCode)
                .IsRequired();

            modelBuilder.Entity<Product>()
                .HasOne(p => p.Category)
                .WithOne();
            #endregion

            #region Manufacture
            modelBuilder.Entity<Manufacture>()
                .HasKey(p => p.Id);

            modelBuilder.Entity<Manufacture>()
                .Property(p => p.Name)
                .IsRequired();

            modelBuilder.Entity<Manufacture>()
                .Property(p => p.Country)
                .IsRequired();
            #endregion

            #region ProductCategory
            modelBuilder.Entity<ProductCategory>()
                .HasKey(p => p.Id);

            modelBuilder.Entity<ProductCategory>()
                .Property(p => p.Name)
                .IsRequired();
            #endregion

            #region ProductUnit
            modelBuilder.Entity<ProductUnit>()
                .HasKey(p => p.Id);

            modelBuilder.Entity<ProductUnit>()
                .Property(p => p.ProviderPrice)
                .IsRequired();

            modelBuilder.Entity<ProductUnit>()
                .Property(p => p.StorePrice)
                .IsRequired();

            modelBuilder.Entity<ProductUnit>()
                .Property(d => d.CreatedDate)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<ProductUnit>()
                .Property(d => d.UpdatedDate)
                .ValueGeneratedOnAddOrUpdate();

            modelBuilder.Entity<ProductUnit>()
                .HasOne(p => p.Product)
                .WithOne();
            #endregion
        }
    }
}
