using System.Collections.Generic;
using System.ComponentModel;

namespace Domain.Models
{
    [Description("Поставщик")]
    public class Provider : BaseEntity, INameId
    {
        public string Name { get; set; }

        public List<Contact> Contacts { get; set; }

        public List<Import> Imports { get; set; }
    }
}
