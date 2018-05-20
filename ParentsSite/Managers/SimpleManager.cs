using Domain.Models;
using Services;

namespace ParentsSite.Managers
{
    public abstract class SimpleManager<TEntity>: BaseManager<TEntity> where TEntity: BaseEntity
    {
        public SimpleManager(BaseService<TEntity> service) : base(service) { }

        public void Create(TEntity entity)
        {
            _service.CreateEntity(entity);
        }

        public abstract void Update(TEntity entity);
    }
}
