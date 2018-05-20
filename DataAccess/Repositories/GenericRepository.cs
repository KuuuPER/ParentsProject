using Domain.Contexts;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace DataAccess.Repositories
{
    public class GenericRepository<TEntity> where TEntity : BaseEntity
    {
        internal DbSet<TEntity> _dbSet;
        internal AppDbContext _context;

        protected DbContext Context
        {
            get
            {
                return _context;
            }
        }

        public GenericRepository(AppDbContext context)
        {
            _context = context;
            _context.Imports.Include(i => i.Products).ThenInclude(p => p.Product);
            _dbSet = context.Set<TEntity>();
        }

        public virtual IEnumerable<TEntity> Get(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = "")
        {
            IQueryable<TEntity> query = _dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                return orderBy(query).ToList();
            }
            else
            {
                return query.ToList();
            }
        }

        public virtual IQueryable<TEntity> GetQuery(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null)
        {
            IQueryable<TEntity> query = _dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (orderBy != null)
            {
                return orderBy(query);
            }
            else
            {
                return query;
            }
        }

        public virtual IQueryable<TEntity> Include<TProperty>(IQueryable<TEntity> query, Expression<Func<TEntity, TProperty>> include)
        {
            if (query != null)
            {
                return query.Include(include);
            }

            throw new Exception();
        }

        public virtual IQueryable<TEntity> ThenInclude<TProperty, TProperty1>(IQueryable<TEntity> query, Expression<Func<TProperty, TProperty1>> thenInclude)
        {
            var includableQuery = query as IIncludableQueryable<TEntity, TProperty>;
            if (includableQuery != null)
            {
                return includableQuery.ThenInclude(thenInclude);
            }

            var collQuery = query as IIncludableQueryable<TEntity, ICollection<TProperty>>;
            if (collQuery != null)
            {
                return collQuery.ThenInclude(thenInclude);
            }

            throw new Exception();
        }

        public virtual void SaveChanges()
        {
            Context.SaveChanges();
        }

        public virtual DbSet<TEntity> GetQuery()
        {
            return Context.Set<TEntity>();
        }

        public virtual int GetCount()
        {
            return Context.Set<TEntity>().Count();
        }

        public virtual DbSet<TEntity> GetAll()
        {
            return Context.Set<TEntity>();
        }

        public virtual IQueryable<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
        {
            return GetQuery().Where(predicate);
        }

        public virtual int Count()
        {
            return GetQuery().Count();
        }

        public virtual void Update(TEntity entityToUpdate)
        {
            _dbSet.Attach(entityToUpdate);
            _context.Entry(entityToUpdate).State = EntityState.Modified;
        }

        public virtual bool Any(Expression<Func<TEntity, bool>> predicate)
        {
            return GetQuery().Any(predicate);
        }

        public virtual TEntity GetByID(object id)
        {
            return _dbSet.Find(id);
        }

        public virtual void Insert(TEntity entity)
        {
            _dbSet.Add(entity);
        }

        public virtual void Delete(Guid id)
        {
            TEntity entityToDelete = _dbSet.Find(id);
            Delete(entityToDelete);
        }

        public virtual void Delete(TEntity entityToDelete)
        {
            if (_context.Entry(entityToDelete).State == EntityState.Detached)
            {
                _dbSet.Attach(entityToDelete);
            }
            _dbSet.Remove(entityToDelete);
        }

        public virtual void DeleteRange(IEnumerable<TEntity> entitiesToDelete)
        {
            foreach (var entity in entitiesToDelete)
            {
                if (_context.Entry(entity).State == EntityState.Detached)
                {
                    _dbSet.Attach(entity);
                }
            }
            
            _dbSet.RemoveRange(entitiesToDelete);
        }
    }
}
