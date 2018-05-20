using DataAccess;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Services
{
    public class DriversService: NameIdService<Driver>
    {
        public DriversService(UnitOfWork unitOfWork): base(unitOfWork, unitOfWork.Drivers){ }

        public Driver GetDriverByIdEager(Guid id)
        {
            var query = GetQuery(filter: d => d.Id == id);
            var include = Include(query, d => d.Deliveries);
            var thenInclude = ThenInclude<Delivery, ICollection<DeliveryPurchase>>(query, d => d.DeliveryPurchases);

            return thenInclude.SingleOrDefault();
        }
    }    
}
