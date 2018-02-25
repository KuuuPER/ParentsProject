using System;
using System.Collections.Generic;

namespace Domain.Models
{
    public class Purchase : BaseEntity
    {
        public Contact Contact { get; set; }

        public DateTime Date { get; set; }

        public IEnumerable<PurchaseUnit> PurchaseUnits { get; set; }

        public Delivery Delivery { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }
    }
}
