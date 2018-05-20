using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ParentsSite.ViewModels
{
    public class PurchaseViewModel: BaseViewModel
    {
        public PurchaseViewModel()
        {
            Deliveries = new List<PurchaseDeliveryViewModel>();
            PurchaseUnits = new List<PurchaseUnitViewModel>();
        }

        public PurchaseViewModel(Purchase purchase): base(purchase)
        {
            CreatedDate = purchase.CreatedDate;
            UpdatedDate = purchase.UpdatedDate;
            Date = purchase.Date;
            Deliveries = purchase.DeliveryPurchases?.Select(dp => new PurchaseDeliveryViewModel(dp)).ToList();
            PurchaseUnits = purchase.PurchaseUnits?.Select(pu => new PurchaseUnitViewModel(pu)).ToList();
        }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public DateTime Date { get; set; }

        public List<PurchaseDeliveryViewModel> Deliveries { get; set; }
        
        public List<PurchaseUnitViewModel> PurchaseUnits { get; set; }
    }
}
