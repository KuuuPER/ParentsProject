namespace Domain.Models
{
    public class Contact : BaseEntity
    {
        public string Name { get; set; }

        public string Address { get; set; }

        public string Phone { get; set; }
    }
}
