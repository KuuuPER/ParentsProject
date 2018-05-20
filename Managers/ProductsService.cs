using DataAccess;
using Domain.Models;

namespace Services
{
    public class ProductsService: NameIdService<Product>
    {
        public ProductsService(UnitOfWork unitOfWork): base(unitOfWork, unitOfWork.Products) { }
    }
}
