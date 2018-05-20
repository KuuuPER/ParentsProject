using DataAccess;
using Domain.Models;

namespace Services
{
    public class ProductCategoriesService: NameIdService<ProductCategory>
    {
        public ProductCategoriesService(UnitOfWork unitOfWork): base(unitOfWork, repository: unitOfWork.ProductCategories) { }
    }
}
