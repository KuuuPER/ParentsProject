using DataAccess;
using DataAccess.Repositories;
using Domain.Exceptions;
using Domain.Helpers;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Services
{
    public abstract class BaseService<TEntity> where TEntity : BaseEntity
    {
        private UnitOfWork _unitOfWork;
        protected GenericRepository<TEntity> _repository;

        public BaseService(UnitOfWork unitOfWork, GenericRepository<TEntity> repository)
        {
            _unitOfWork = unitOfWork;
            _repository = repository;
        }

        public abstract bool EntityExist(TEntity entity);

        public bool EntityExist(Guid id)
        {
            return _repository.Any(e => e.Id == id);
        }

        public IEnumerable<TEntity> Get(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = "")
        {
            return _repository.Get(filter, orderBy, includeProperties);
        }

        public IQueryable<TEntity> GetQuery(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null)
        {
            return _repository.GetQuery(filter, orderBy);
        }

        public virtual IQueryable<TEntity> Include<TProperty>(IQueryable<TEntity> query, Expression<Func<TEntity, TProperty>> include)
        {
            return _repository.Include(query, include);
        }

        public virtual IQueryable<TEntity> ThenInclude<TProperty, TProperty1>(IQueryable<TEntity> query, Expression<Func<TProperty, TProperty1>> thenInclude)
        {
            return _repository.ThenInclude(query, thenInclude);
        }

        public TEntity GetEntityById(Guid? id)
        {
            if (id == null)
            {
                throw new NullReferenceException("Параметр id не может быть пустым.");
            }

            return _repository.GetByID(id);            
        }

        public IEnumerable<TEntity> GetAll()
        {
            return _repository.GetAll();
        }

        public int GetCount()
        {
            return _repository.GetCount();
        }

        public void CreateEntity(TEntity entity)
        {
            _repository.Insert(entity);
            _unitOfWork.Save();
        }

        public void UpdateEntity(TEntity entity)
        {
            _repository.Update(entity);
            _unitOfWork.Save();
        }

        public void DeleteEntityRange(IEnumerable<TEntity> entities)
        {
            _repository.DeleteRange(entities);
            _unitOfWork.Save();
        }

        public void DeleteEntity(TEntity entity)
        {
            _repository.Delete(entity);
            _unitOfWork.Save();
        }

        public void DeleteEntity(Guid id)
        {
            _repository.Delete(id);
            _unitOfWork.Save();
        }
    }
}
