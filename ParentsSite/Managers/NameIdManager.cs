using Domain.Models;
using Services;

namespace ParentsSite.Managers
{
    public class NameIdManager<TEntity>: BaseManager<TEntity> where TEntity : BaseEntity, INameId
    {
        private NameIdService<TEntity> _nameIdService;

        public NameIdManager(NameIdService<TEntity> service): base(service)
        {
            _nameIdService = service;
        }

        public bool EntityExist(INameId entity)
        {
            return _nameIdService.EntityExist(entity);
        }

        public new bool EntityExist(TEntity entity)
        {
            return _nameIdService.EntityExist(entity);
        }

        public bool EntityExist(string name)
        {
            return _nameIdService.EntityExist(name);
        }
    }
}
