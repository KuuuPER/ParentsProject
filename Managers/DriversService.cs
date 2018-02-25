using DataAccess;
using Domain.Models;
using Managers.Providers;

namespace Services
{
    public class DriversService
    {
        public BaseProvider<Driver> DriversProvider { get; set; }

        public DriversService(UnitOfWork unitOfWork)
        {
            this.DriversProvider = new BaseProvider<Driver>(unitOfWork);
        }
    }
}
