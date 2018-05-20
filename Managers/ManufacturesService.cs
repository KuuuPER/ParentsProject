using DataAccess;
using Domain.Models;

namespace Services
{
    public class ManufacturesService: NameIdService<Manufacture>
    {
        public ManufacturesService(UnitOfWork unitOfWork): base(unitOfWork, unitOfWork.Manufactures){ }
    }
}
