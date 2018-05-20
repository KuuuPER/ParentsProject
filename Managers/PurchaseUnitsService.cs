using DataAccess;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Services
{
    public class PurchaseUnitsService: BaseService<PurchaseUnit>
    {
        public PurchaseUnitsService(UnitOfWork unitOfWork): base(unitOfWork, unitOfWork.PurchaseUnits){ }

        public override bool EntityExist(PurchaseUnit purchaseUnit)
        {
            return base.EntityExist(purchaseUnit.Id);
        }

        public PurchaseUnit GetPurchaseUnitByIdEager(Guid id)
        {
            var query = GetQuery(filter: pu => pu.Id == id);
            var include = Include(query, pu => pu.Product);
            var thenInclude = ThenInclude<Product, Provider>(include, p => p.Provider);
            thenInclude = ThenInclude<Product, Manufacture>(thenInclude, p => p.Manufacture);
            thenInclude = ThenInclude<Product, ProductCategory>(thenInclude, p => p.Category);
            include = Include(thenInclude, p => p.Purchase);
            thenInclude = ThenInclude<Purchase, ICollection<DeliveryPurchase>>(include, p => p.DeliveryPurchases);
            thenInclude = ThenInclude<DeliveryPurchase, ICollection<Contact>>(include, dp => dp.Contacts);

            return thenInclude.SingleOrDefault();
        }

        public void DeletePurchaseUnitsByPurchaseId(Guid purchaseId)
        {
            var pUnits = _repository.Find(pu => pu.Purchase.Id == purchaseId).ToArray();
            _repository.DeleteRange(pUnits);
        }

        public Purchase GetPurchaseById(Guid id)
        {
            return _repository.Find(pu => pu.Id == id).Select(pu => pu.Purchase).Single();
        }
    }
}
