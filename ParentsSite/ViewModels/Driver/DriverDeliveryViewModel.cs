using Domain.Models;
using System;
using Domain.Enums;

namespace ParentsSite.ViewModels
{
    public class DriverDeliveryViewModel: BaseViewModel
    {
        public DriverDeliveryViewModel() { }

        public DriverDeliveryViewModel(Delivery delivery): base(delivery)
        {
            DeliveryDate = delivery.DeliveryDate;
            PurchasesCount = delivery.DeliveryPurchases?.Count;
            Status = delivery.Status;
        }

        public DateTime? DeliveryDate { get; set; }

        public int? PurchasesCount { get; set; }

        public DeliveryStatus Status { get; set; }
    }
}
