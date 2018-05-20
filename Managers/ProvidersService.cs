using DataAccess;
using Domain.Models;

namespace Services
{
    public class ProvidersService: NameIdService<Provider>
    {
        public ProvidersService(UnitOfWork unitOfWork): base(unitOfWork, unitOfWork.Providers){ }
    }
}
