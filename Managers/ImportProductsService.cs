using Domain.Models;
using DataAccess;

namespace Services
{
    public class ImportProductsService : BaseService<ImportProduct>
    {
        public ImportProductsService(UnitOfWork unitOfWork) : base(unitOfWork, unitOfWork.ImportProducts){ }

        public override bool EntityExist(ImportProduct importProduct)
        {
            return _repository.Any(i => i.Id == importProduct.Id);
        }
    }
}
