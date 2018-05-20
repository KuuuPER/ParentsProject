using Domain.Models;
using System.Linq;
using System.Collections.Generic;
using System;

namespace ParentsSite.ViewModels
{
    public class DeliveryPurchaseViewModel
    {
        public DeliveryPurchaseViewModel(DeliveryPurchase deliveryPurchase)
        {
            Address = deliveryPurchase.Address;
            TimeFrom = deliveryPurchase.TimeFrom;
            TimeTo = deliveryPurchase.TimeTo;
            Notes = deliveryPurchase.Notes;
            Id = deliveryPurchase.Purchase.Id;
            Contacts = deliveryPurchase.Contacts.ToList();
            PurchaseUnits = deliveryPurchase.Delivery?.PurchaseUnits.Select(pu => new PurchaseUnitViewModel(pu)).ToList() ??
                deliveryPurchase.Purchase?.PurchaseUnits.Select(pu => new PurchaseUnitViewModel(pu)).ToList();
        }

        public Guid Id { get; set; }

        public string Address { get; set; }

        public byte TimeFrom { get; set; }

        public byte TimeTo { get; set; }

        public string Notes { get; set; }

        public List<Contact> Contacts { get; set; }

        public List<PurchaseUnitViewModel> PurchaseUnits { get; set; }
    }
}
