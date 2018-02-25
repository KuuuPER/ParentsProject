using Domain.Models;
using DataAccess;

namespace Managers.Providers
{
    public class DeliveryService : BaseProvider<Delivery>
    {
        public DeliveryService(UnitOfWork unitOfWork) : base(unitOfWork)
        {
        }
    }
}
