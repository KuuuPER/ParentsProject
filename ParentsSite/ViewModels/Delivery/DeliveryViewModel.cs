using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using Domain.Enums;

namespace ParentsSite.ViewModels
{
    public class DeliveryViewModel: BaseViewModel
    {
        public DeliveryViewModel()
        {
            Purchases = new List<DeliveryPurchaseViewModel>();
        }

        public DeliveryViewModel(Delivery delivery): base(delivery)
        {
            Status = delivery.Status;
            CreatedDate = delivery.CreatedDate;
            DeliveryDate = delivery.DeliveryDate;
            FinishDate = delivery.FinishDate;
            Driver = new NameId(delivery.Driver);
            Purchases = delivery.DeliveryPurchases?.Select(dp => new DeliveryPurchaseViewModel(dp)).ToList()
                ?? new List<DeliveryPurchaseViewModel>();
        }

        public DeliveryStatus Status { get; set; }

        public DateTime? CreatedDate { get; set; }

        public DateTime? DeliveryDate { get; set; }

        public DateTime? FinishDate { get; set; }

        public NameId Driver { get; set; }

        public List<DeliveryPurchaseViewModel> Purchases { get; set; }
    }
}
