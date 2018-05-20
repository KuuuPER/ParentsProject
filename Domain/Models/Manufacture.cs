using System.ComponentModel;

namespace Domain.Models
{
    [Description("Производитель")]
    public class Manufacture : BaseEntity, INameId
    {
        public string Name { get; set; }

        public string Country { get; set; }

        public string Description { get; set; }
    }
}
