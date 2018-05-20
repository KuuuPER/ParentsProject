using Domain.Enums;
using Domain.Models;
using System;

namespace ParentsSite.ViewModels
{
    public class ProductViewModel: NameId
    {
        public ProductViewModel() { }

        public ProductViewModel(Product product): base(product)
        {
            VendorCode = product.VendorCode;
            Category = new NameId { Id = product.Category.Id, Name = product.Category.Name };
            Manufacture = new NameId { Id = product.Manufacture.Id, Name = product.Manufacture.Name };
            Provider = new NameId { Id = product.Provider.Id, Name = product.Provider.Name };
            Count = product.Count;
            ProviderPrice = product.ProviderPrice;
            StorePrice = product.StorePrice;
            Description = product.Description;
            State = product.State;
        }

        public string VendorCode { get; set; }

        public NameId Category { get; set; }

        public NameId Manufacture { get; set; }

        public NameId Provider { get; set; }

        public int Count { get; set; }

        public int ProviderPrice { get; set; }

        public int StorePrice { get; set; }

        public string Description { get; set; }

        public ProductState State { get; set; }
    }
}
