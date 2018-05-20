using Domain.Models;
using System;
using Services;
using ParentsSite.ViewModels;
using Domain.Enums;
using Domain.Exceptions;

namespace ParentsSite.Managers
{
    public class PurchaseUnitsManager : BaseManager<PurchaseUnit>
    {
        private PurchasesService _purchasesService;
        private ProductsService _productsService;
        private PurchaseUnitsService _purchaseUnitsService;
        public PurchaseUnitsManager(PurchaseUnitsService purchaseUnitsService, PurchasesService purchasesService, ProductsService productsService) : base(purchaseUnitsService)
        {
            _purchasesService = purchasesService;
            _productsService = productsService;
            _purchaseUnitsService = purchaseUnitsService;
        }

        public PurchaseUnit GetPurchaseUnitByIdEager(Guid id)
        {
            return _purchaseUnitsService.GetPurchaseUnitByIdEager(id);
        }

        public void CreatePurchaseUnit(PurchaseUnitViewModel purchaseUnitViewModel)
        {
            var purchaseUnit = new PurchaseUnit
            {
                Count = purchaseUnitViewModel.Count,
                Status = PurchaseUnitStatuses.New,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now,
                StorePrice = purchaseUnitViewModel.StorePrice
            };

            var product = GetProduct(purchaseUnitViewModel.Product);
            var purchase = GetPurchase(purchaseUnitViewModel.Id.Value);

            purchaseUnit.Product = product;
            purchaseUnit.Purchase = purchase;

            _service.CreateEntity(purchaseUnit);
        }

        private Product GetProduct(INameId productNameId)
        {
            var product = _productsService.GetEntityById(productNameId.Id);

            if (product != null)
            {
                return product;
            }
            else
            {
                throw new EntityNotFoundException("Товар", product.Id);
            }
        }

        private Purchase GetPurchase(Guid id)
        {
            var purchase = _purchaseUnitsService.GetPurchaseById(id);

            if (purchase != null)
            {
                return purchase;
            }
            else
            {
                throw new EntityNotFoundException("Покупка", purchase.Id);
            }
        }
    }
}
