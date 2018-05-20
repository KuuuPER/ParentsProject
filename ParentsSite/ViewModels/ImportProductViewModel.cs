using Domain.Models;
using System;

namespace ParentsSite.ViewModels
{
    public class ImportProductViewModel
    {
        public ImportProductViewModel() { }

        public ImportProductViewModel(Guid productId)
        {
            ProductId = productId;
        }

        public ImportProductViewModel(ImportProduct importProduct)
        {
            ProductId = importProduct?.Product?.Id;
            Count = importProduct.Count;
        }

        public Guid? ProductId { get; set; }

        public int Count { get; set; }
    }
}
