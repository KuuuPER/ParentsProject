using Domain.Models;
using System;
using System.Collections.Generic;

namespace ParentsSite.ViewModels
{
    public class ProviderViewModel: NameId
    {
        public ProviderViewModel()
        {
            Imports = new List<Import>();
        }

        public ProviderViewModel(Provider provider) : base(provider)
        {
            Contacts = provider.Contacts;
            Imports = provider.Imports;
        }

        public List<Contact> Contacts { get; set; }

        public List<Import> Imports { get; set; }
    }
}
