using Domain.Enums;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ParentsSite.ViewModels
{
    public class ImportViewModel: BaseViewModel
    {
        public ImportViewModel(Import import): base(import)
        {
            this.Id = import.Id;
            this.Provider = new NameId(import.Provider);
            this.Products = import.Products?.Select(p => new ImportProductViewModel(p))?.ToList();
            this.CreatedDate = import.CreatedDate;
            this.ImportDate = import.ImportDate;
            this.FinishDate = import.FinishDate;
            this.Status = import.Status;
        }

        public ImportViewModel() { }

        public NameId Provider { get; set; }

        public List<ImportProductViewModel> Products { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime ImportDate { get; set; }

        public DateTime? FinishDate { get; set; }

        public ImportStatus Status { get; set; }
    }    
}
