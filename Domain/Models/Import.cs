using Domain.Enums;
using System;
using System.Collections.Generic;

namespace Domain.Models
{
    public class Import : BaseEntity
    {
        public Provider Provider { get; set; }

        public List<Product> Products { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime ImportDate { get; set; }

        public DateTime? FinishDate { get; set; }

        public ImportStatus Status { get; set; }
    }
}
