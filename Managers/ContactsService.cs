using DataAccess;
using Domain.Models;
using Managers.Providers;

namespace Services
{
    public class ContactsService
    {
        public BaseProvider<Contact> ContactsProvider { get; set; }

        public ContactsService(UnitOfWork unitOfWork)
        {
            this.ContactsProvider = new BaseProvider<Contact>(unitOfWork);
        }
    }
}
