using Domain.Models;
using System;

namespace ParentsSite.ViewModels
{
    public abstract class BaseViewModel
    {
        public BaseViewModel() { }

        public BaseViewModel(BaseEntity entity)
        {
            Id = entity.Id;
        }

        public Guid? Id { get; set; }
    }
}
