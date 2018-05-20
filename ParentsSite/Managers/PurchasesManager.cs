using Domain.Models;
using System;
using System.Collections.Generic;
using Services;
using ParentsSite.ViewModels;
using Domain.Enums;
using Domain.Exceptions;
using Domain.Helpers;
using System.Linq;

namespace ParentsSite.Managers
{
    public class PurchasesManager : BaseManager<Purchase>
    {
        private DeliveriesService _deliveriesService;
        private ProductsService _productsService;
        private PurchasesService _purchasesService;
        private PurchaseUnitsService _purchaseUnitsService;
        private ContactsService _contactsService;
        private DeliveryPurchasesService _deliveryPurchasesService;

        public PurchasesManager(PurchasesService service,
            PurchaseUnitsService purchaseUnitsService,
            DeliveriesService deliveriesService,
            ProductsService productsService,
            ContactsService contactsService,
            DeliveryPurchasesService deliveryPurchasesService) : base(service)
        {
            _deliveriesService = deliveriesService;
            _productsService = productsService;
            _purchasesService = service;
            _purchaseUnitsService = purchaseUnitsService;
            _contactsService = contactsService;
            _deliveryPurchasesService = deliveryPurchasesService;
        }

        public List<PurchaseViewModel> GetAllPurchases(PageInfo pageInfo)
        {
            if (pageInfo == null)
            {
                return _service
                    .Get(includeProperties: $"{nameof(Purchase.DeliveryPurchases)},{nameof(Purchase.PurchaseUnits)}")
                    .Select(p => new PurchaseViewModel(p)).ToList();
            }

            return _service
                .Get(includeProperties: $"{nameof(Purchase.DeliveryPurchases)},{nameof(Purchase.PurchaseUnits)}")
                .Skip((pageInfo.CurrentPage - 1) * pageInfo.ItemsPerPage)
                .Take(pageInfo.ItemsPerPage).Select(p => new PurchaseViewModel(p)).ToList();
        }

        public List<DeliveryViewModel> GetDeliveriesByPurchaseId(PageInfo pageInfo, Guid purchaseId)
        {
            return GetPurchaseEagerById(purchaseId).DeliveryPurchases
                .Skip((pageInfo.CurrentPage - 1) * pageInfo.ItemsPerPage)
                .Take(pageInfo.ItemsPerPage).Select(dp => new DeliveryViewModel(dp.Delivery)).ToList();
        }

        public List<PurchaseDeliveryViewModel> GetDeliveries(PageInfo pageInfo)
        {
            if (pageInfo != null)
            {
                return _deliveryPurchasesService.GetAllDeliveryPurchases()
                .Skip((pageInfo.CurrentPage - 1) * pageInfo.ItemsPerPage)
                .Take(pageInfo.ItemsPerPage).Select(dp => new PurchaseDeliveryViewModel(dp)).ToList();
            }

            return _deliveryPurchasesService.GetAllDeliveryPurchases().Select(dp => new PurchaseDeliveryViewModel(dp)).ToList();
        }

        public List<PurchaseUnitViewModel> GetPurchaseUnitsByPurchaseId(PageInfo pageInfo, Guid purchaseId)
        {
            return GetPurchaseEagerById(purchaseId).PurchaseUnits
                .Skip((pageInfo.CurrentPage - 1) * pageInfo.ItemsPerPage)
                .Take(pageInfo.ItemsPerPage).Select(pu => new PurchaseUnitViewModel(pu)).ToList();
        }

        public Purchase GetPurchaseEagerById(Guid id)
        {
            if (!_service.EntityExist(id))
            {
                throw new EntityNotFoundException(BaseEntityHelper.Description(typeof(Purchase)), id);
            }

            return _purchasesService.GetPurchaseEagerById(id);
        }

        public void Create(PurchaseViewModel purchaseViewModel)
        {
            var purchase = new Purchase()
            {
                Date = purchaseViewModel.Date,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            };

            purchase.PurchaseUnits = CreatePurchaseUnits(purchaseViewModel.PurchaseUnits, purchase);

            var deliveryPurchases = new List<DeliveryPurchase>(purchaseViewModel.Deliveries.Count);
            foreach (var delVm in purchaseViewModel.Deliveries)
            {
                var delivery = _deliveriesService.GetEntityById(delVm.DeliveryId);
                var contacts = new List<Contact>(delVm.Contacts.Count);
                foreach (var contact in delVm.Contacts)
                {
                    contacts.Add(new Contact { Name = contact.Name, Phone = contact.Phone });
                }

                var dPurchase = new DeliveryPurchase()
                {
                    Contacts = contacts,
                    Address = delVm.Address,
                    Date = delVm.Date.Value,
                    Purchase = purchase,
                    TimeFrom = delVm.TimeFrom,
                    TimeTo = delVm.TimeTo,
                    Notes = delVm.Notes
                };

                if (delivery != null)
                {
                    dPurchase.Delivery = delivery;
                }

                deliveryPurchases.Add(dPurchase);
            }

            purchase.DeliveryPurchases = deliveryPurchases;

            _service.CreateEntity(purchase);
        }

        public void Update(PurchaseViewModel purchaseViewModel)
        {
            var purchase = _service.GetEntityById(purchaseViewModel.Id);
            if (purchase == null)
            {
                throw new EntityNotFoundException(BaseEntityHelper.Description(typeof(Purchase)), purchaseViewModel.Id.Value);
            }

            purchase.Date = purchaseViewModel.Date;

            purchase.PurchaseUnits = CreatePurchaseUnits(purchaseViewModel.PurchaseUnits, purchase);
            purchase.DeliveryPurchases = CreateDeliveryPurchases(purchaseViewModel.Deliveries, purchase);

            _service.UpdateEntity(purchase);
        }

        private List<PurchaseUnit> CreatePurchaseUnits(List<PurchaseUnitViewModel> purchaseUnitsVM, Purchase purchase)
        {
            var purchaseUnits = new List<PurchaseUnit>(purchaseUnitsVM.Count);
            _purchaseUnitsService.DeletePurchaseUnitsByPurchaseId(purchase.Id);

            foreach (var purchaseUnit in purchaseUnitsVM)
            {
                var product = _productsService.GetEntityById(purchaseUnit.Product.Id);

                if (product != null)
                {
                    purchaseUnits.Add(new PurchaseUnit
                    {
                        Product = product,
                        Count = purchaseUnit.Count,
                        CreatedDate = DateTime.Now,
                        StorePrice = purchaseUnit.StorePrice,
                        Status = PurchaseUnitStatuses.New,
                        Purchase = purchase
                    });
                }
                else
                {
                    throw new EntityNotFoundException(BaseEntityHelper.Description(typeof(PurchaseUnit)), purchaseUnit.Id.Value);
                }
            }

            return purchaseUnits;
        }

        private List<DeliveryPurchase> CreateDeliveryPurchases(List<PurchaseDeliveryViewModel> purchaseDeliveryVM, Purchase purchase)
        {
            var deliveryPurchases = new List<DeliveryPurchase>(purchaseDeliveryVM.Count);
            var dPurchases = _deliveryPurchasesService.GetDeliveryPurchasesByPurchaseId(purchase.Id);
            _deliveryPurchasesService.DeleteEntityRange(dPurchases);

            foreach (var delVm in purchaseDeliveryVM)
            {
                var contacts = new List<Contact>(delVm.Contacts.Count);
                foreach (var contact in delVm.Contacts)
                {
                    contacts.Add(new Contact { Name = contact.Name, Phone = contact.Phone });
                }

                var delPurch = new DeliveryPurchase()
                {
                    Address = delVm.Address,
                    Date = delVm.Date.Value,
                    Purchase = purchase,
                    Contacts = contacts,
                    TimeFrom = delVm.TimeFrom,
                    TimeTo = delVm.TimeTo,
                    Notes = delVm.Notes
                };

                var delivery = delVm.DeliveryId != null ? _deliveriesService.GetEntityById(delVm.DeliveryId) : null;

                if (delivery != null)
                {
                    delPurch.Delivery = delivery;
                }

                deliveryPurchases.Add(delPurch);
            }

            return deliveryPurchases;
        }
    }
}
