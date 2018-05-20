using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace Domain.Models
{
    [Description("Покупка")]
    public class Purchase : BaseEntity
    {
        public DateTime Date { get; set; }

        public ICollection<DeliveryPurchase> DeliveryPurchases { get;set;}

        public ICollection<PurchaseUnit> PurchaseUnits { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public PurchaseStatus Status { get; set; }

        public string Notes { get; set; }
    }
}
