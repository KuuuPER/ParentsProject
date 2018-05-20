using System.ComponentModel;

namespace Domain.Models
{
    [Description("Товар прихода")]
    public class ImportProduct : BaseEntity
    {
        public Product Product { get; set; }

        public int Count { get; set; }
    }
}
