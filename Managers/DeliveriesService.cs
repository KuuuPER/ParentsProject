using DataAccess;
using Domain.Models;
using Managers.Providers;

namespace Services
{
    public class DeliveriesService
    {
        public BaseProvider<Delivery> DeliveryProvider { get; set; }

        public DeliveriesService(UnitOfWork unitOfWork)
        {
            this.DeliveryProvider = new BaseProvider<Delivery>(unitOfWork);
        }
    }
}
