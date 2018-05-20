using DataAccess;
using Domain.Models;
using System;
using System.Linq;
using System.Collections.Generic;

namespace Services
{
    public class DeliveriesService: BaseService<Delivery>
    {
        public DeliveriesService(UnitOfWork unitOfWork): base(unitOfWork, unitOfWork.Deliveries){ }

        public override bool EntityExist(Delivery delivery)
        {
            return base.EntityExist(delivery.Id);
        }

        public Delivery GetDeliveryByIdEager(Guid? id)
        {
            if (id == null)
            {
                throw new NullReferenceException("Параметр id не может быть пустым.");
            }

            var query = GetQuery(filter: d => d.Id == id);
            var include = Include(query, d => d.DeliveryPurchases);
            include = ThenInclude<DeliveryPurchase, ICollection<Contact>>(include, dp => dp.Contacts);
            include = Include(include, d => d.DeliveryPurchases);
            include = Include(include, d => d.Driver);

            include = Include(include, d => d.DeliveryPurchases);
            var thenInclude = ThenInclude<DeliveryPurchase, Purchase>(include, dp => dp.Purchase);
            include = Include(thenInclude, d => d.PurchaseUnits);

            thenInclude = ThenInclude<PurchaseUnit, Product>(include, pu => pu.Product);
            thenInclude = ThenInclude<Product, ProductCategory>(thenInclude, p => p.Category);

            include = Include(thenInclude, d => d.PurchaseUnits);
            thenInclude = ThenInclude<PurchaseUnit, Product>(include, pu => pu.Product);
            thenInclude = ThenInclude<Product, Provider>(thenInclude, p => p.Provider);

            include = Include(thenInclude, d => d.PurchaseUnits);
            thenInclude = ThenInclude<PurchaseUnit, Product>(include, pu => pu.Product);
            thenInclude = ThenInclude<Product, Manufacture>(thenInclude, p => p.Manufacture);

            return thenInclude.SingleOrDefault();
        }
    }
}
