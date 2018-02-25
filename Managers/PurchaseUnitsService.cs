using DataAccess;
using Domain.Models;
using Managers.Providers;

namespace Services
{
    public class PurchaseUnitsService
    {
        public BaseProvider<PurchaseUnit> PurchaseUnitsProvider { get; set; }

        public PurchaseUnitsService(UnitOfWork unitOfWork)
        {
            this.PurchaseUnitsProvider = new BaseProvider<PurchaseUnit>(unitOfWork);
        }
    }
}
