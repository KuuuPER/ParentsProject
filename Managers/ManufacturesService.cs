using DataAccess;
using Domain.Models;
using Managers.Providers;

namespace Services
{
    public class ManufacturesService
    {
        public BaseProvider<Manufacture> ManufacturesProvider { get; set; }

        public ManufacturesService(UnitOfWork unitOfWork)
        {
            this.ManufacturesProvider = new BaseProvider<Manufacture>(unitOfWork);
        }
    }
}
