using System;
using System.ComponentModel;
using System.Linq;

namespace Domain.Helpers
{
    public static class BaseEntityHelper
    {
        public static string Description(Type type)
        {
            var dnAttribute = type.GetCustomAttributes(
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
