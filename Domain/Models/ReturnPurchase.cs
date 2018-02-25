using Domain.Enums;
using System.Collections.Generic;

namespace Domain.Models
{
    public class ReturnPurchase : BaseEntity
    {
        public Purchase Purchase { get; set; }

        public IEnumerable<PurchaseUnit> ReturnItems { get; set; }

        public ReturnReason Reason { get; set; }

        public string Comment { get; set; }
    }
}
