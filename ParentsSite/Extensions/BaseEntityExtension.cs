using System.ComponentModel;
using System.Linq;
using Domain.Models;

namespace ParentsSite.Extensions
{
    public static class BaseEntityExtension
    {
        public static string Description(this BaseEntity entity)
        {
            var dnAttribute = typeof(BaseEntity).GetCustomAttributes(
                typeof(DescriptionAttribute), true
            ).FirstOrDefault() as DescriptionAttribute;
            if (dnAttribute != null)
            {
                return dnAttribute.Description;
            }
            return null;
        }
    }
}
