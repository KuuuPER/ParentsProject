using Domain.Models;
using System;
using System.Collections.Generic;
using Services;
using ParentsSite.ViewModels;

namespace ParentsSite.Managers
{
    public class ReturnPurchasesManager : BaseManager<ReturnPurchase>
    {
        private ReturnPurchasesService _returnPurchasesService;
        private PurchasesService _purchasesService;
        private PurchaseUnitsService _purchaseUnitsService;

        public ReturnPurchasesManager(ReturnPurchasesService returnPurchasesService,
            PurchasesService purchasesService,
            PurchaseUnitsService purchaseUnitsService) : base(returnPurchasesService)
        {
            _returnPurchasesService = returnPurchasesService;
            _purchasesService = purchasesService;
            _purchaseUnitsService = purchaseUnitsService;
        }

        public ReturnPurchase GetReturnPurchaseByIdEager(Guid id)
        {
            return _returnPurchasesService.GetReturnPurchaseByIdEager(id);
        }

        public void CreateReturnPurchase(ReturnPurchaseViewModel returnPurchaseVM)
        {
            var returnPurchase = new ReturnPurchase
            {
                Reason = returnPurchaseVM.Reason,
                Comment = returnPurchaseVM.Comment
            };

            returnPurchase.Purchase = _purchasesService.GetEntityById(returnPurchaseVM.PurchaseId);

            var returnItems = new List<PurchaseUnit>(returnPurchaseVM.ReturnItems.Count);
            foreach (var pUnit in returnPurchaseVM.ReturnItems)
            {
                var purchaseUnit = _purchaseUnitsService.GetEntityById(pUnit.Id);
                returnItems.Add(purchaseUnit);
            }

            returnPurchase.ReturnItems = returnItems;

            _returnPurchasesService.CreateEntity(returnPurchase);
        }

        public void DeleteReturnPurchase(Guid id)
        {
            _returnPurchasesService.DeleteEntity(id);
        }
    }
}
