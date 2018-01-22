using System;

namespace Domain.Models
{
    public class Product : BaseEntity
    {
        public string Name { get; set; }

        public string VendorCode { get; set; }

        public ProductCategory Category { get; set; }

        public Guid CategoryId { get; set; }

        public Manufacture Manufacture { get; set; }

        public Guid ManufactureId { get; set; }
    }
}
