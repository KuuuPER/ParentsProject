using DataAccess;
using Domain.Models;

namespace Services
{
    public class ContactsService: NameIdService<Contact>
    {
        public ContactsService(UnitOfWork unitOfWork): base(unitOfWork, unitOfWork.Contacts) { }
    }
}
