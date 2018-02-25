using DataAccess;
using Domain.Models;
using Managers.Providers;

namespace Services
{
    public class ProductsService
    {
        public BaseProvider<Product> ProductsProvider { get; set; }

        public ProductsService(UnitOfWork unitOfWork)
        {
            this.ProductsProvider = new BaseProvider<Product>(unitOfWork);
        }
    }
}
