using System;
using System.Collections.Generic;
using System.Linq;
using DataAccess;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Domain.Enums;

namespace Services
{
    public class DeliveryPurchasesService
    {
        private readonly DbSet<DeliveryPurchase> _deliveryPurchases;

        public DeliveryPurchasesService(UnitOfWork unitOfWork)
        {
            _deliveryPurchases = unitOfWork.DeliveryPurchases;
        }

        public List<DeliveryPurchase> GetDeliveryPurchases(Guid deliveryId)
        {
            return _deliveryPurchases.Where(dp => dp.Delivery.Id == deliveryId).ToList();
        }

        public void DeleteDeliveryPurchases(Guid deliveryId)
        {
            var deliveryPurchases = _deliveryPurchases.Where(dp => dp.Delivery.Id == deliveryId).ToArray();
            _deliveryPurchases.RemoveRange(deliveryPurchases);
        }

        public async Task<bool> EntityExist(DeliveryPurchase deliveryPurchase)
        {
            return await _deliveryPurchases.AnyAsync(dp => dp.Delivery.Id == deliveryPurchase.Delivery.Id
            && dp.Purchase.Id == deliveryPurchase.Purchase.Id);
        }

        public void DeleteEntity(DeliveryPurchase deliveryPurchase)
        {
            _deliveryPurchases.Remove(deliveryPurchase);
        }

        public void DeleteEntityRange(IEnumerable<DeliveryPurchase> deliveryPurchases)
        {
            _deliveryPurchases.RemoveRange(deliveryPurchases);
        }

        public List<DeliveryPurchase> GetDeliveryPurchasesByPurchaseId(Guid purchaseId)
        {
            return _deliveryPurchases.Where(dp => dp.Purchase.Id == purchaseId).ToList();
        }

        public List<DeliveryPurchase> GetAllDeliveryPurchases()
        {
            return _deliveryPurchases
                .Include(dp => dp.Contacts)
                .Include(dp => dp.Purchase)
                .ThenInclude(p => p.PurchaseUnits)
                .ThenInclude(pu => pu.Product)
                .Where(dp => dp.Purchase.Status == PurchaseStatus.Opened).ToList();
        }
    }
}
