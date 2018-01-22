using Domain.Enums;
using System;
using System.Collections.Generic;

namespace Domain.Models
{
    public class Delivery : BaseEntity
    {
        public Guid ProviderId { get; set; }

        public Provider Provider { get; set;}

        public List<ProductUnit> ProductUnits { get; set; }

        public DeliveryStatus Status { get; set; }

        public DateTime? CreatedDate { get; set; }        

        public DateTime? FinishDate { get; set; }
    }
}
