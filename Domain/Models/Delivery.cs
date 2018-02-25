using Domain.Enums;
using System;
using System.Collections.Generic;

namespace Domain.Models
{
    public class Delivery : BaseEntity
    {
        public Driver Driver { get; set; }

        public IEnumerable<PurchaseUnit> PurchaseUnits { get; set; }

        public DeliveryStatus Status { get; set; }

        public DateTime? CreatedDate { get; set; }

        public DateTime? DeliveryDate { get; set; }

        public DateTime? FinishDate { get; set; }

        public string Notes { get; set; }
    }
}
