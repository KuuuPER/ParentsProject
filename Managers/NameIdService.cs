using DataAccess;
using DataAccess.Repositories;
using Domain.Models;

namespace Services
{
    public class NameIdService<TEntity> : BaseService<TEntity> where TEntity : BaseEntity, INameId
    {
        public NameIdService(UnitOfWork unitOfWork, GenericRepository<TEntity> repository): base(unitOfWork, repository) { }

        public override bool EntityExist(TEntity entity)
        {
            if (entity == null)
            {
                return false;
            }

            return _repository.Any(p => p.Id == entity.Id || p.Name.ToLower() == entity.Name.ToLower());
        }

        public bool EntityExist(INameId entity)
        {
            if (entity == null)
            {
                return false;
            }

            return _repository.Any(p => p.Id == entity.Id || p.Name.ToLower() == entity.Name.ToLower());
        }

        public bool EntityExist(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return false;
            }

            return _repository.Any(p => p.Name.ToLower() == name.ToLower());
        }
    }
}
