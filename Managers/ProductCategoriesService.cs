using DataAccess;
using Domain.Models;
using Managers.Providers;

namespace Services
{
    public class ProductCategoriesService
    {
        public BaseProvider<ProductCategory> CategoriesProvider { get; set; }

        public ProductCategoriesService(UnitOfWork unitOfWork)
        {
            this.CategoriesProvider = new BaseProvider<ProductCategory>(unitOfWork);
        }
    }
}
