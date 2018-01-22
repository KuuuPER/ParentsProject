using Domain.Contexts;
using System.Linq;

namespace Domain
{
    public static class DomainDbInitializer
    {
        public static void Seed(AppDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.Manufactures.Any())
            {
                return;
            }
        }
    }
}
