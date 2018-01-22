using Domain.Models;
using DataAccess;

namespace Managers.Sevices
{
    public class DeliveryService : BaseService<Delivery>
    {
        public DeliveryService(UnitOfWork unitOfWork) : base(unitOfWork)
        {
        }
    }
}
