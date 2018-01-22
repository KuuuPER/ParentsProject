using Domain.Models;

namespace DataAccess.Repositories
{
    public class DeliveryRepository : BaseRepository<Delivery>
    {
        public DeliveryRepository(UnitOfWork unitOfWork) : base(unitOfWork)
        {
        }
    }
}
