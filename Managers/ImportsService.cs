using DataAccess;
using Domain.Models;
using System;
using System.Linq;

namespace Services
{
    public class ImportsService : BaseService<Import>
    {
        public ImportsService(UnitOfWork unitOfWork): base(unitOfWork, unitOfWork.Imports){ }

        public override bool EntityExist(Import import)
        {
            return this.EntityExist(import.Id);
        }

        public Import GetImportWithProductsById(Guid? id)
        {
            if (id == null)
            {
                throw new NullReferenceException("Параметр id не может быть пустым.");
            }

            var query = GetQuery(filter: i => i.Id == id);
            var include = Include(query, i => i.Products);
            var thenInclude = ThenInclude<ImportProduct, ProductCategory>(include, p => p.Product.Category);
            include = Include(thenInclude, i => i.Products);
            thenInclude = ThenInclude<ImportProduct, Manufacture>(include, p => p.Product.Manufacture);
            include = Include(thenInclude, i => i.Products);
            thenInclude = ThenInclude<ImportProduct, Provider>(include, p => p.Product.Provider);

            var res = Include(thenInclude, i => i.Provider);
            return res.SingleOrDefault();
        }
    }
}
