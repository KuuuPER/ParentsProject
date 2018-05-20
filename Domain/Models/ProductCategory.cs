using System.ComponentModel;

namespace Domain.Models
{
    [Description("Категория товара")]
    public class ProductCategory : BaseEntity, INameId
    {
        public string Name { get; set; }
    }
}
