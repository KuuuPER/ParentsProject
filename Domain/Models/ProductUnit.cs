using System;

namespace Domain.Models
{
    public class ProductUnit : BaseEntity
    {
        public Product Product { get; set; }

        public Guid ProductId { get; set; }

        public int Count { get; set; }

        public int ProviderPrice { get; set; }

        public int StorePrice { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }
    }
}
