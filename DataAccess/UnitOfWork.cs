using System;
using Domain.Contexts;
using DataAccess.Repositories;
using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess
{
    public class UnitOfWork : IDisposable
    {
        private AppDbContext _context { get; set; }

        private GenericRepository<Product> _products;
        private GenericRepository<ProductCategory> _productCategories;
        private GenericRepository<Provider> _providers;
        private GenericRepository<Manufacture> _manufactures;
        private GenericRepository<Delivery> _deliveries;
        private GenericRepository<Driver> _drivers;
        private GenericRepository<Contact> _contacts;
        private GenericRepository<Import> _imports;
        private GenericRepository<ImportProduct> _importProducts;
        private GenericRepository<Purchase> _purchases;
        private DbSet<DeliveryPurchase> _deliveryPurchases;
        private GenericRepository<PurchaseUnit> _purchaseUnits;
        private GenericRepository<ReturnPurchase> _returnPurchases;

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
        }

        #region Repositories accessors
        public GenericRepository<Product> Products
        {
            get
            {
                return _products ?? new GenericRepository<Product>(_context);
            }
        }

        public GenericRepository<ProductCategory> ProductCategories
        {
            get
            {
                return _productCategories ?? new GenericRepository<ProductCategory>(_context);
            }
        }

        public GenericRepository<Provider> Providers
        {
            get
            {
                return _providers ?? new GenericRepository<Provider>(_context);
            }
        }

        public GenericRepository<Manufacture> Manufactures
        {
            get
            {
                return _manufactures ?? new GenericRepository<Manufacture>(_context);
            }
        }

        public GenericRepository<Delivery> Deliveries
        {
            get
            {
                return _deliveries ?? new GenericRepository<Delivery>(_context);
            }
        }

        public GenericRepository<Driver> Drivers
        {
            get
            {
                return _drivers ?? new GenericRepository<Driver>(_context);
            }
        }

        public GenericRepository<Contact> Contacts
        {
            get
            {
                return _contacts ?? new GenericRepository<Contact>(_context);
            }
        }

        public GenericRepository<Import> Imports
        {
            get
            {
                return _imports ?? new GenericRepository<Import>(_context);
            }
        }

        public GenericRepository<ImportProduct> ImportProducts
        {
            get
            {
                return _importProducts ?? new GenericRepository<ImportProduct>(_context);
            }
        }

        public GenericRepository<Purchase> Purchases
        {
            get
            {
                return _purchases ?? new GenericRepository<Purchase>(_context);
            }
        }

        public DbSet<DeliveryPurchase> DeliveryPurchases
        {
            get
            {
                return _context.DeliveryPurchases;
            }
        }

        public GenericRepository<PurchaseUnit> PurchaseUnits
        {
            get
            {
                return _purchaseUnits ?? new GenericRepository<PurchaseUnit>(_context);
            }
        }

        public GenericRepository<ReturnPurchase> ReturnPurchases
        {
            get
            {
                return _returnPurchases ?? new GenericRepository<ReturnPurchase>(_context);
            }
        }
#endregion

        public void Save()
        {
            _context.SaveChanges();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
