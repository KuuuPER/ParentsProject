using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace Domain.Models
{
    [Description("Доставка")]
    public class Delivery : BaseEntity
    {
        public Driver Driver { get; set; }

        public ICollection<DeliveryPurchase> DeliveryPurchases { get; set; }

        public ICollection<PurchaseUnit> PurchaseUnits { get; set; }

        public DeliveryStatus Status { get; set; }

        public DateTime? CreatedDate { get; set; }

        public DateTime? DeliveryDate { get; set; }

        public DateTime? FinishDate { get; set; }
    }
}
