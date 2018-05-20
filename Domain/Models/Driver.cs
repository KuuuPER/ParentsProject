using System.Collections.Generic;
using System.ComponentModel;

namespace Domain.Models
{
    [Description("Водитель")]
    public class Driver : BaseEntity, INameId
    {
        public string Name { get; set; }

        public int Rate { get; set; }

        public string Notes { get; set; }

        public ICollection<Delivery> Deliveries { get; set; }
    }
}
