using System.Collections.Generic;

namespace Domain.Models
{
    public class Driver : BaseEntity
    {
        public string Name { get; set; }

        public int Rate { get; set; }

        public string Notes { get; set; }

        public IEnumerable<Delivery> Deliveries { get; set; }
    }
}
