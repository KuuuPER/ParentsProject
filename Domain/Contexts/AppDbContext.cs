﻿using Microsoft.EntityFrameworkCore;
using Domain.Models;
using System;

namespace Domain.Contexts
{
    public class AppDbContext : DbContext
    {
        public DbSet<Contact> Contacts { get; set; }

        public DbSet<Driver> Drivers { get; set; }

        public DbSet<Delivery> Deliveries { get; set; }

        public DbSet<Import> Imports { get; set; }

        public DbSet<Manufacture> Manufactures { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<ProductCategory> ProductCategories { get; set; }

        public DbSet<Provider> Providers { get; set; }

        public DbSet<Purchase> Purchases { get; set; }

        public DbSet<DeliveryPurchase> DeliveryPurchases { get; set; }

        public DbSet<PurchaseUnit> PurchaseUnits { get; set; }

        public DbSet<ReturnPurchase> ReturnPurchases { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options): base(options){ }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region Contact
            modelBuilder.Entity<Contact>()
                .HasKey(c => c.Id);

            modelBuilder.Entity<Contact>()
                .Property(c => c.Name)
                .IsRequired();

            modelBuilder.Entity<Contact>()
                .Property(c => c.Phone)
                .IsRequired();            
            #endregion

            #region Driver
            modelBuilder.Entity<Driver>()
                .HasKey(d => d.Id);

            modelBuilder.Entity<Driver>()
                .Property(d => d.Name)
                .IsRequired();

            modelBuilder.Entity<Driver>()
                .Property(d => d.Notes);

            modelBuilder.Entity<Driver>()
                .Property(d => d.Rate);

            modelBuilder.Entity<Driver>()
                .HasMany(d => d.Deliveries)
                .WithOne(d => d.Driver);
            #endregion

            #region DeliveryPurchase
            modelBuilder.Entity<DeliveryPurchase>()
                .Property<Guid>("DeliveryPurchaseId");

            modelBuilder.Entity<DeliveryPurchase>()
                .HasKey("DeliveryPurchaseId");

            modelBuilder.Entity<DeliveryPurchase>()
                .HasOne(dp => dp.Delivery)
                .WithMany(d => d.DeliveryPurchases)
                .HasForeignKey("DeliveryId")
                .IsRequired(false);

            modelBuilder.Entity<DeliveryPurchase>()
                .HasOne(dp => dp.Purchase)
                .WithMany(p => p.DeliveryPurchases)
                .HasForeignKey("PurchaseId")
                .IsRequired(false);

            modelBuilder.Entity<DeliveryPurchase>()
                .Property(dp => dp.TimeFrom);
                

            modelBuilder.Entity<DeliveryPurchase>()
                .Property(dp => dp.TimeTo);

            modelBuilder.Entity<DeliveryPurchase>()
                .Property(dp => dp.Notes);

            modelBuilder.Entity<DeliveryPurchase>()
                .HasMany(p => p.Contacts)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<DeliveryPurchase>()
                .Property(dp => dp.Address);

            modelBuilder.Entity<DeliveryPurchase>()
                .Property(dp => dp.Date)
                .IsRequired();

            modelBuilder.Entity<DeliveryPurchase>()
                .HasMany(dp => dp.Contacts);
            #endregion

            #region Delivery
            modelBuilder.Entity<Delivery>()
                .HasKey(p => p.Id);

            modelBuilder.Entity<Delivery>()
                .Property(d => d.CreatedDate)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Delivery>()
                .Property(d => d.DeliveryDate)
                .IsRequired();

            modelBuilder.Entity<Delivery>()
                .HasOne(d => d.Driver);

            modelBuilder.Entity<Delivery>()
                .Property(d => d.FinishDate)
                .IsRequired(false);

            modelBuilder.Entity<Delivery>()
                .HasMany(p => p.DeliveryPurchases)
                .WithOne(dp => dp.Delivery);

            modelBuilder.Entity<Delivery>()
                .HasMany(p => p.PurchaseUnits)
                .WithOne();

            modelBuilder.Entity<Delivery>()
                .Property(d => d.Status)
                .IsRequired();
            #endregion

            #region Import
            modelBuilder.Entity<Import>()
                .HasKey(i => i.Id);

            modelBuilder.Entity<Import>()
                .Property(i => i.FinishDate)
                .IsRequired(false);

            modelBuilder.Entity<Import>()
                .Property(i => i.ImportDate)
                .IsRequired();

            modelBuilder.Entity<Import>()
                .HasMany(i => i.Products)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Import>()
                .HasOne(i => i.Provider);

            modelBuilder.Entity<Import>()
                .Property(i => i.Status);
            #endregion

            #region ImportProduct
            modelBuilder.Entity<ImportProduct>()
                .HasKey(i => i.Id);

            modelBuilder.Entity<ImportProduct>()
                .HasOne(i => i.Product);

            modelBuilder.Entity<ImportProduct>()
                .Property(i => i.Count);
            #endregion

            #region Manufacture
            modelBuilder.Entity<Manufacture>()
                .HasKey(p => p.Id);

            modelBuilder.Entity<Manufacture>()
                .Property(p => p.Name)
                .IsRequired();

            modelBuilder.Entity<Manufacture>()
                .Property(p => p.Description);

            modelBuilder.Entity<Manufacture>()
                .Property(p => p.Country)
                .IsRequired();
            #endregion

            #region Product
            modelBuilder.Entity<Product>()
                .HasKey(p => p.Id);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.Category);

            modelBuilder.Entity<Product>()
                .Property(p => p.Count)
                .IsRequired();

            modelBuilder.Entity<Product>()
                .HasOne(p => p.Manufacture);

            modelBuilder.Entity<Product>()
                .Property(p => p.Name)
                .IsRequired();

            modelBuilder.Entity<Product>()
                .HasOne(p => p.Provider);

            modelBuilder.Entity<Product>()
                .Property(p => p.ProviderPrice)
                .IsRequired();

            modelBuilder.Entity<Product>()
                .Property(p => p.State)
                .IsRequired();

            modelBuilder.Entity<Product>()
                .Property(p => p.StorePrice)
                .IsRequired();

            modelBuilder.Entity<Product>()
                .Property(p => p.VendorCode)
                .IsRequired();

            modelBuilder.Entity<Product>()
                .Property(p => p.Description);
            #endregion

            #region ProductCategory
            modelBuilder.Entity<ProductCategory>()
                .HasKey(p => p.Id);

            modelBuilder.Entity<ProductCategory>()
                .Property(p => p.Name)
                .IsRequired();
            #endregion

            #region Provider
            modelBuilder.Entity<Provider>()
                .HasKey(p => p.Id);

            modelBuilder.Entity<Provider>()
                .Property(p => p.Name)
                .IsRequired();

            modelBuilder.Entity<Provider>()
                .HasMany(p => p.Contacts);

            modelBuilder.Entity<Provider>()
                .HasMany(p => p.Imports)
                .WithOne(d => d.Provider);
            #endregion

            #region Purchase
            modelBuilder.Entity<Purchase>()
                .HasKey(p => p.Id);

            modelBuilder.Entity<Purchase>()
                .Property(p => p.CreatedDate)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Purchase>()
                .Property(p => p.Date)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Purchase>()
                .HasMany(p => p.DeliveryPurchases)
                .WithOne(p => p.Purchase);

            modelBuilder.Entity<Purchase>()
                .HasMany(p => p.PurchaseUnits)
                .WithOne(p => p.Purchase);

            modelBuilder.Entity<Purchase>()
                .Property(p => p.UpdatedDate)
                .ValueGeneratedOnUpdate();

            modelBuilder.Entity<Purchase>()
                .Property(p => p.Status);

            modelBuilder.Entity<Purchase>()
                .Property(p => p.Notes);
            #endregion

            #region PurchaseUnits
            modelBuilder.Entity<PurchaseUnit>()
                .HasKey(pu => pu.Id);

            modelBuilder.Entity<PurchaseUnit>()
                .Property(pu => pu.Count);

            modelBuilder.Entity<PurchaseUnit>()
                .Property(pu => pu.CreatedDate)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<PurchaseUnit>()
                .HasOne(pu => pu.Product);

            modelBuilder.Entity<PurchaseUnit>()
                .HasOne(pu => pu.Purchase)
                .WithMany(p => p.PurchaseUnits);

            modelBuilder.Entity<PurchaseUnit>()
                .Property(pu => pu.StorePrice)
                .IsRequired();

            modelBuilder.Entity<PurchaseUnit>()
                .Property(pu => pu.Status);

            modelBuilder.Entity<PurchaseUnit>()
                .Property(pu => pu.UpdatedDate)
                .ValueGeneratedOnUpdate();
            #endregion

            #region ReturnPurchase
            modelBuilder.Entity<ReturnPurchase>()
                .HasKey(r => r.Id);

            modelBuilder.Entity<ReturnPurchase>()
                .Property(r => r.Comment);

            modelBuilder.Entity<ReturnPurchase>()
                .HasOne(r => r.Purchase);

            modelBuilder.Entity<ReturnPurchase>()
                .Property(r => r.Reason);

            modelBuilder.Entity<ReturnPurchase>()
                .HasMany(r => r.ReturnItems);
            #endregion            
        }
    }
}
