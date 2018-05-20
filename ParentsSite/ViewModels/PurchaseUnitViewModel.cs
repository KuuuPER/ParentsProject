using Domain.Enums;
using Domain.Models;
using System;

namespace ParentsSite.ViewModels
{
    public class PurchaseUnitViewModel: BaseViewModel
    {
        public PurchaseUnitViewModel() { }

        public PurchaseUnitViewModel(PurchaseUnit purchaseUnit): base(purchaseUnit)
        {
            Product = new NameId(purchaseUnit.Product);            
            Status = purchaseUnit.Status;
            StorePrice = purchaseUnit.StorePrice;
            UpdatedDate = purchaseUnit.UpdatedDate;
            Count = purchaseUnit.Count;
        }

        public NameId Product { get; set; }

        public PurchaseUnitStatuses Status { get; set; }

        public int StorePrice { get; set; }

        public DateTime UpdatedDate { get; set; }

        public int Count { get; set; }
    }
}
