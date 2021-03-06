﻿using Domain.Enums;
using System;
using System.ComponentModel;

namespace Domain.Models
{
    [Description("Единица покупки")]
    public class PurchaseUnit : BaseEntity
    {
        public Purchase Purchase { get; set; }

        public Product Product { get; set; }

        public int Count { get; set; }

        public int StorePrice { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public PurchaseUnitStatuses Status { get; set; }
    }
}
