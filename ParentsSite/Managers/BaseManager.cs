using Domain.Models;
using ParentsSite.ViewModels;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ParentsSite.Managers
{
    public abstract class BaseManager<TEntity> where TEntity: BaseEntity
    {
        protected BaseService<TEntity> _service;
        
        public BaseManager(BaseService<TEntity> service)
        {
            _service = service;
        }

        public int GetCount()
        {
            return _service.GetCount();
        }

        public IEnumerable<TEntity> GetPage(PageInfo pageInfo)
        {
            return _service.Get()
                .Skip((pageInfo.CurrentPage - 1) * pageInfo.ItemsPerPage)
                .Take(pageInfo.ItemsPerPage);
        }

        public IEnumerable<TEntity> GetAll()
        {
            return _service.GetAll();
        }

        public TEntity GetById(Guid id)
        {
            return _service.GetEntityById(id);
        }

        public bool EntityExist(Guid? id)
        {
            if (id == null)
            {
                throw new NullReferenceException("Параметр id не может быть пустым");
            }

            return _service.EntityExist(id.Value);            
        }

        public bool EntityExist(TEntity entity)
        {
            return _service.EntityExist(entity);
        }

        public void Delete(Guid? id)
        {
            if (id == null)
            {
                throw new NullReferenceException("Параметр id не может быть пустым");
            }

            var existedEntity = _service.GetEntityById(id.Value);

            if (existedEntity != null)
            {
                _service.DeleteEntity(existedEntity);
            }
        }
    }
}
