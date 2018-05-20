using Domain.Enums;
using System.Collections.Generic;
using System.ComponentModel;

namespace Domain.Models
{
    [Description("Возврат")]
    public class ReturnPurchase : BaseEntity
    {
        public Purchase Purchase { get; set; }

        public ICollection<PurchaseUnit> ReturnItems { get; set; }

        public ReturnReason Reason { get; set; }

        public string Comment { get; set; }
    }
}
