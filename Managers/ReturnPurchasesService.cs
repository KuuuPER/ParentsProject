using DataAccess;
using Domain.Models;
using Managers.Providers;

namespace Services
{
    public class ReturnPurchasesService
    {
        public BaseProvider<ReturnPurchase> ReturnPurchasesProvider { get; set; }

        public ReturnPurchasesService(UnitOfWork unitOfWork)
        {
            this.ReturnPurchasesProvider = new BaseProvider<ReturnPurchase>(unitOfWork);
        }
    }
}
