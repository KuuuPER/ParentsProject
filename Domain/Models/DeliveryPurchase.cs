using System;
using System.Collections.Generic;

namespace Domain.Models
{
    public class DeliveryPurchase
    {
        public Delivery Delivery { get; set; }

        public Purchase Purchase { get; set; }

        public ICollection<Contact> Contacts { get; set; }

        public DateTime Date { get; set; }

        public string Address { get; set; }

        public byte TimeFrom { get; set; }

        public byte TimeTo { get; set; }

        public string Notes { get; set; }
    }
}
