using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace Domain.Models
{
    [Description("Приход")]
    public class Import : BaseEntity
    {
        public Provider Provider { get; set; }

        public ICollection<ImportProduct> Products { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime ImportDate { get; set; }

        public DateTime? FinishDate { get; set; }

        public ImportStatus Status { get; set; }
    }
}
