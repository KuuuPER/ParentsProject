using System;
using Domain.Contexts;
using Microsoft.EntityFrameworkCore;

namespace DataAccess
{
    public class UnitOfWork : IDisposable
    {
        public DbContext Context { get; set; }

        public UnitOfWork(AppDbContext context)
        {
            Context = context;
        }

        public void Dispose()
        {
            if (Context != null)
            {
                Context.Dispose();
                Context = null;
            }
            GC.SuppressFinalize(this);
        }
    }
}
