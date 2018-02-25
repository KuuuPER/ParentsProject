using DataAccess;
using Domain.Models;
using Managers.Providers;

namespace Services
{
    public class ProvidersService
    {
        public BaseProvider<Provider> ProvidersProvider { get; set; }

        public ProvidersService(UnitOfWork unitOfWork)
        {
            this.ProvidersProvider = new BaseProvider<Provider>(unitOfWork);
        }
    }
}
