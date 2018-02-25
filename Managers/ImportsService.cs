using DataAccess;
using Domain.Models;
using Managers.Providers;

namespace Services
{
    public class ImportsService
    {
        public BaseProvider<Import> ImportsProvider { get; set; }

        public ImportsService(UnitOfWork unitOfWork)
        {
            this.ImportsProvider = new BaseProvider<Import>(unitOfWork);
        }
    }
}
