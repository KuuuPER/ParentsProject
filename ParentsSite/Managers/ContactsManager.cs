using Domain.Models;
using Services;

namespace ParentsSite.Managers
{
    public class ContactsManager : SimpleNameIdManager<Contact>
    {
        public ContactsManager(ContactsService service) : base(service)
        {
            _service = service;
        }

        public override void Update(Contact contact)
        {
            if (this.EntityExist(contact))
            {
                var existedContact = _service.GetEntityById(contact.Id);

                existedContact.Name = contact.Name;
                existedContact.Phone = contact.Phone;

                _service.UpdateEntity(existedContact);
            }
        }
    }
}
