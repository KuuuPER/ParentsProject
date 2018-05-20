using Domain.Models;

namespace ParentsSite.ViewModels
{
    public class ContactViewModel : BaseViewModel
    {
        public ContactViewModel() { }

        public ContactViewModel(Contact contact): base(contact)
        {
            Name = contact.Name;
            Phone = contact.Phone;
        }

        public string Name { get; set; }

        public string Phone { get; set; }
    }
}
