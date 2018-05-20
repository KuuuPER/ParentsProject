using DataAccess;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;


namespace Services
{
    public class ReturnPurchasesService: BaseService<ReturnPurchase>
    {
        public ReturnPurchasesService(UnitOfWork unitOfWork): base(unitOfWork, unitOfWork.ReturnPurchases){ }

        public override bool EntityExist(ReturnPurchase returnPurchase)
        {
            return base.EntityExist(returnPurchase.Id);
        }

        public ReturnPurchase GetReturnPurchaseByIdEager(Guid id)
        {
            var query = GetQuery(filter: rp => rp.Id == id);
            var include = Include(query, rp => rp.Purchase);
            var thenInclude = ThenInclude<Purchase, ICollection<DeliveryPurchase>>(include, p => p.DeliveryPurchases);
            thenInclude = ThenInclude<DeliveryPurchase, ICollection<Contact>>(include, dp => dp.Contacts);
            include = Include(thenInclude, rp => rp.ReturnItems);
            thenInclude = ThenInclude<PurchaseUnit, Product>(include, pu => pu.Product);
            thenInclude = ThenInclude<Product, ProductCategory>(thenInclude, p => p.Category);
            thenInclude = ThenInclude<Product, Manufacture>(thenInclude, p => p.Manufacture);
            thenInclude = ThenInclude<Product, Provider>(thenInclude, p => p.Provider);

            return thenInclude.SingleOrDefault();
        }
    }
}
