using Domain.Enums;

namespace Domain.Models
{
    public class Product : BaseEntity
    {
        public string Name { get; set; }

        public string VendorCode { get; set; }

        public ProductCategory Category { get; set; }

        public Manufacture Manufacture { get; set; }

        public Provider Provider { get; set; }

        public int Count { get; set; }

        public int ProviderPrice { get; set; }

        public int StorePrice { get; set; }

        public ProductState State { get; set; }
    }
}
