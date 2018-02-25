using DataAccess;
using Domain.Models;
using Managers.Providers;

namespace Services
{
    public class PurchasesService
    {
        public BaseProvider<Purchase> PurchasesProvider { get; set; }

        public PurchasesService(UnitOfWork unitOfWork)
        {
            this.PurchasesProvider = new BaseProvider<Purchase>(unitOfWork);
        }
    }
}
