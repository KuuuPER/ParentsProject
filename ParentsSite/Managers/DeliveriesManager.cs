using Domain.Models;
using System;
using System.Collections.Generic;
using Services;
using ParentsSite.ViewModels;
using Domain.Enums;
using System.Linq;

namespace ParentsSite.Managers
{
    public class DeliveriesManager : BaseManager<Delivery>
    {
        private DeliveriesService _deliveriesService;
        private PurchaseUnitsService _purchaseUnitsService;
        private DeliveryPurchasesService _deliveryPurchasesService;
        private PurchasesService _purchasesService;
        private DriversService _driversService;

        public DeliveriesManager(DeliveriesService deliveriesService,
            PurchasesService purchasesService,
            DeliveryPurchasesService deliveryPurchasesService,
            PurchaseUnitsService purchaseUnitsService,
            DriversService driversService) : base(deliveriesService)
        {
            _deliveriesService = deliveriesService;
            _purchaseUnitsService = purchaseUnitsService;
            _deliveryPurchasesService = deliveryPurchasesService;
            _deliveryPurchasesService = deliveryPurchasesService;
            _driversService = driversService;
        }

        public List<DeliveryViewModel> GetAllDeliveries(PageInfo pageInfo)
        {
            if (pageInfo == null)
            {
                return _service
                    .Get(includeProperties: $"{nameof(Delivery.DeliveryPurchases)},{nameof(Delivery.Driver)},{nameof(Delivery.PurchaseUnits)}")
                    .Select(d => new DeliveryViewModel(d)).ToList();
            }

            return _service
                .Get(includeProperties: $"{nameof(Delivery.DeliveryPurchases)},{nameof(Delivery.Driver)},{nameof(Delivery.PurchaseUnits)}")
                .Skip((pageInfo.CurrentPage - 1) * pageInfo.ItemsPerPage)
                .Take(pageInfo.ItemsPerPage)
                .Select(d => new DeliveryViewModel(d)).ToList();
        }

        public List<DeliveryPurchaseViewModel> GetPurchasesByDeliveryId(Guid id)
        {
            return GetDeliveryByIdEager(id).DeliveryPurchases
                .Select(dp => new DeliveryPurchaseViewModel(dp)).ToList();
        }

        public List<DeliveryPurchaseViewModel> GetDeliveryPurchases()
        {
            return _deliveryPurchasesService.GetAllDeliveryPurchases()
                .Select(dp => new DeliveryPurchaseViewModel(dp)).ToList();
        }

        public List<PurchaseUnitViewModel> GetPurchaseUnitsByDeliveryId(PageInfo pageInfo, Guid id)
        {
            return GetDeliveryByIdEager(id).PurchaseUnits
                .Skip((pageInfo.CurrentPage - 1) * pageInfo.ItemsPerPage)
                .Take(pageInfo.ItemsPerPage)
                .Select(pu => new PurchaseUnitViewModel(pu)).ToList();
        }

        public Delivery GetDeliveryById(Guid id)
        {
            return _service.GetEntityById(id);            
        }

        public Delivery GetDeliveryByIdEager(Guid id)
        {
            return _deliveriesService.GetDeliveryByIdEager(id);
        }

        public void Create(DeliveryViewModel deliveryVM)
        {
            var delivery = new Delivery
            {
                DeliveryDate = deliveryVM.DeliveryDate,
                Status = DeliveryStatus.Planned,
            };

            delivery.Driver = _driversService.GetEntityById(deliveryVM.Driver.Id);

            var deliveryPurchases = new List<DeliveryPurchase>(deliveryVM.Purchases?.Count ?? 0);
            foreach (var purchaseVM in deliveryVM.Purchases)
            {
                var purchase = _purchasesService.GetEntityById(purchaseVM.Id);
                deliveryPurchases.Add(
                    new DeliveryPurchase
                    {
                        Delivery = delivery,
                        Purchase = purchase,
                        TimeFrom = purchaseVM.TimeFrom,
                        TimeTo = purchaseVM.TimeTo,
                        Notes = purchaseVM.Notes
                    });
            }

            delivery.DeliveryPurchases = deliveryPurchases;

            var purchaseUnitsVM = deliveryVM.Purchases.SelectMany(p => p.PurchaseUnits).ToArray();
            var purchaseUnits = new List<PurchaseUnit>(purchaseUnitsVM.Count());
            foreach (var pUnitsVM in purchaseUnitsVM)
            {
                var purchaseUnit = _purchaseUnitsService.GetEntityById(pUnitsVM.Id);
                purchaseUnits.Add(purchaseUnit);
            }

            delivery.PurchaseUnits = purchaseUnits;

            _service.CreateEntity(delivery);
        }

        public void Update(DeliveryViewModel deliveryVM)
        {
            var delivery = _deliveriesService.GetDeliveryByIdEager(deliveryVM.Id);

            delivery.DeliveryDate = deliveryVM.DeliveryDate;
            delivery.Status = deliveryVM.Status;

            delivery.Driver = _driversService.GetEntityById(deliveryVM.Driver.Id);

            _deliveryPurchasesService.DeleteDeliveryPurchases(delivery.Id);
            var deliveryPurchases = new List<DeliveryPurchase>(deliveryVM.Purchases.Count);
            foreach (var purchaseVM in deliveryVM.Purchases)
            {
                var purchase = _purchasesService.GetEntityById(purchaseVM.Id);
                deliveryPurchases.Add(
                        new DeliveryPurchase
                        {
                            Delivery = delivery,
                            Purchase = purchase,
                            TimeFrom = purchaseVM.TimeFrom,
                            TimeTo = purchaseVM.TimeTo,
                            Notes = purchaseVM.Notes
                        });
            }

            delivery.DeliveryPurchases = deliveryPurchases;

            var purchaseUnitsVM = deliveryVM.Purchases.SelectMany(p => p.PurchaseUnits).ToArray();
            var purchaseUnits = new List<PurchaseUnit>(purchaseUnitsVM.Length);
            foreach (var pUnitsVM in purchaseUnitsVM)
            {
                var purchaseUnit = _purchaseUnitsService.GetEntityById(pUnitsVM.Id);
                purchaseUnits.Add(purchaseUnit);
            }

            delivery.PurchaseUnits = purchaseUnits;

            _service.UpdateEntity(delivery);
        }
    }
}
