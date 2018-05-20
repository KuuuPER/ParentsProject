using Domain.Models;
using System.Collections.Generic;
using System.Linq;
using Domain.Enums;
using System;

namespace ParentsSite.ViewModels
{
    public class ReturnPurchaseViewModel : BaseViewModel
    {
        public ReturnPurchaseViewModel() { }

        public ReturnPurchaseViewModel(ReturnPurchase returnPurchase): base(returnPurchase)
        {
            PurchaseId = returnPurchase.Purchase.Id;
            ReturnItems = returnPurchase.ReturnItems.Select(pu => new PurchaseUnitViewModel(pu)).ToList();
            Reason = returnPurchase.Reason;
            Comment = returnPurchase.Comment;
        }

        public Guid PurchaseId { get; set; }

        public List<PurchaseUnitViewModel> ReturnItems { get; set; }

        public ReturnReason Reason { get; set; }

        public string Comment { get; set; }
    }
}
