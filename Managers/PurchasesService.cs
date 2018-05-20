using DataAccess;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Services
{
    public class PurchasesService: BaseService<Purchase>
    {
        public PurchasesService(UnitOfWork unitOfWork): base(unitOfWork, unitOfWork.Purchases){ }

        public override bool EntityExist(Purchase purchase)
        {
            return base.EntityExist(purchase.Id);
        }

        public Purchase GetPurchaseEagerById(Guid id)
        {
            var query = GetQuery(filter: p => p.Id == id);
            var include = Include(query, p => p.DeliveryPurchases);
            include = ThenInclude<DeliveryPurchase, ICollection<Contact>>(include, dp => dp.Contacts);

            include = Include(include, p => p.DeliveryPurchases);
            var thenInclude = ThenInclude<DeliveryPurchase, Delivery>(include, dp => dp.Delivery);
            thenInclude = ThenInclude<Delivery, Driver>(thenInclude, d => d.Driver);

            include = Include(thenInclude, p => p.PurchaseUnits);
            thenInclude = ThenInclude<PurchaseUnit, Product>(include, p => p.Product);
            thenInclude = ThenInclude<Product, Provider>(thenInclude, p => p.Provider);

            include = Include(thenInclude, p => p.PurchaseUnits);
            thenInclude = ThenInclude<PurchaseUnit, Product>(include, p => p.Product);
            thenInclude = ThenInclude<Product, Manufacture>(thenInclude, p => p.Manufacture);

            include = Include(thenInclude, p => p.PurchaseUnits);
            thenInclude = ThenInclude<PurchaseUnit, Product>(include, p => p.Product);
            thenInclude = ThenInclude<Product, ProductCategory>(thenInclude, p => p.Category);

            return thenInclude.SingleOrDefault();
        }
    }
}
