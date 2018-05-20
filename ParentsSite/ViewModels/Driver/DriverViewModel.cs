using Domain.Models;
using System.Linq;
using System.Collections.Generic;

namespace ParentsSite.ViewModels
{
    public class DriverViewModel: NameId
    {
        public DriverViewModel() { }

        public DriverViewModel(Driver driver): base(driver)
        {
            Notes = driver.Notes;
            Rate = driver.Rate;
            Deliveries = driver.Deliveries?.Select(d => new DriverDeliveryViewModel(d)).ToList();
        }

        public string Notes { get; set; }

        public int Rate { get; set; }

        public List<DriverDeliveryViewModel> Deliveries { get; set; }
    }
}
