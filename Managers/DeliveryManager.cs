using DataAccess;
using Managers.Sevices;

namespace Managers
{
    public class DeliveryManager
    {
        public DeliveryService DeliveryService { get; set; }

        public DeliveryManager(UnitOfWork unitOfWork)
        {
            this.DeliveryService = new DeliveryService(unitOfWork);
        }
    }
}
