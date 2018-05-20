using System.ComponentModel;

namespace Domain.Models
{
    [Description("Контакт")]
    public class Contact : BaseEntity, INameId
    {
        public string Name { get; set; }

        public string Phone { get; set; }
    }
}
