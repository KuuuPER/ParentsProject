using System.Collections.Generic;

namespace Domain.Models
{
    public class Provider : BaseEntity
    {
        public string Name { get; set; }

        public List<Contact> Contacts { get; set; }

        public List<Import> Imports { get; set; }
    }
}
