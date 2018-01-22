using System;
using System.Collections.Generic;

namespace Domain.Models
{
    public class Provider : BaseEntity
    {
        public string Name { get; set; }

        public string Address { get; set; }

        public string Phone { get; set; }

        public List<Delivery> Deliveries { get; set; }
    }
}
