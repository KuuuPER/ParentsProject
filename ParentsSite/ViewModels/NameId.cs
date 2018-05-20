using Domain.Models;
using System;

namespace ParentsSite.ViewModels
{
    public class NameId: INameId
    {
        public NameId() { }

        public NameId(INameId nameId)
        {
            Id = nameId?.Id ?? default(Guid);
            Name = nameId?.Name;
        }

        public Guid Id { get; set; }

        public string Name { get; set; }
    }
}
