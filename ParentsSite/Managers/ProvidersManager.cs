using Domain.Models;
using ParentsSite.ViewModels;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ParentsSite.Managers
{
    public class ProvidersManager: NameIdManager<Provider>
    {
        private ProvidersService _providersService;
        private ContactsService _contactsService;
        private ImportsService _importService;

        public ProvidersManager(ProvidersService providersService, ContactsService contactsManager, ImportsService importService) : base(providersService)
        {
            _providersService = providersService;
            _contactsService = contactsManager;
            _importService = importService;
        }

        public IEnumerable<Provider> GetAllProviders(PageInfo pageInfo)
        {
            return _providersService.Get(includeProperties: $"{nameof(Provider.Contacts)},{nameof(Provider.Imports)}")
                .Skip((pageInfo.CurrentPage - 1) * pageInfo.ItemsPerPage)
                .Take(pageInfo.ItemsPerPage);
        }

        public Provider GetProvider(Guid id)
        {
            return _providersService.Get(filter: p => p.Id == id,
                includeProperties: $"{nameof(Provider.Contacts)},{nameof(Provider.Imports)}")
                .SingleOrDefault();
        }

        public bool ProviderExist(INameId provider)
        {
            return _providersService.EntityExist(provider);
        }

        public void Update(ProviderViewModel providerViewModel)
        {
            var existedProvider = _providersService.GetEntityById(providerViewModel.Id);
            existedProvider.Name = providerViewModel.Name;

            var contacts = new List<Contact>(providerViewModel.Contacts?.Count ?? 0);
            foreach (var contact in providerViewModel.Contacts)
            {
                if (_contactsService.EntityExist(contact))
                {
                    _contactsService.UpdateEntity(contact);
                    contacts.Add(contact);
                }
                else
                {
                    contacts.Add(contact);
                }
            }
            existedProvider.Contacts = contacts;

            var imports = new List<Import>(providerViewModel.Imports?.Count ?? 0);
            foreach (var import in providerViewModel.Imports)
            {
                if (_importService.EntityExist(import.Id))
                {
                    imports.Add(_importService.GetEntityById(import.Id));
                }
            }
            existedProvider.Imports = imports;

            _providersService.UpdateEntity(existedProvider);
        }

        public void Create(ProviderViewModel providerViewModel)
        {
            var provider = new Provider();
            provider.Name = providerViewModel.Name;
            provider.Contacts = providerViewModel.Contacts;

            var imports = new List<Import>(providerViewModel.Imports?.Count ?? 0);
            foreach (var import in providerViewModel.Imports)
            {
                if (_importService.EntityExist(import.Id))
                {
                    imports.Add(_importService.GetEntityById(import.Id));
                }
            }
            provider.Imports = imports;

            _providersService.CreateEntity(provider);
        }
    }
}
