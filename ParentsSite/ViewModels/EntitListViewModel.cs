using Domain.Models;
using System.Collections.Generic;

namespace ParentsSite.ViewModels
{
    public class EntitListViewModel<TEntity> where TEntity: class
    {
        public IEnumerable<TEntity> Entities { get; set; }
        public PageInfo PageInfo { get; set; }
    }
}
