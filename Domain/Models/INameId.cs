using System;

namespace Domain.Models
{
    public interface INameId
    {
        Guid Id { get; set; }

        string Name { get; set; }
    }
}
