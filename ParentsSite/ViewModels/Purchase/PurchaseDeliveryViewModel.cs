using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ParentsSite.ViewModels
{
    public class PurchaseDeliveryViewModel
    {
        public PurchaseDeliveryViewModel()
        {
            DeliveryPurchaseUnits = new List<PurchaseUnitViewModel>();
        }

        public PurchaseDeliveryViewModel(DeliveryPurchase deliveryPurchase)
        {
            Contacts = deliveryPurchase.Contacts?.Select(c => new ContactViewModel(c)).ToList();
            Address = deliveryPurchase.Address;
            TimeFrom = deliveryPurchase.TimeFrom;
            TimeTo = deliveryPurchase.TimeTo;
            Notes = deliveryPurchase.Notes;
            Date = deliveryPurchase.Date;
            DeliveryId = deliveryPurchase.Delivery?.Id;
            Driver = deliveryPurchase.Delivery?.Driver != null ? new NameId(deliveryPurchase.Delivery.Driver) : null;
            DeliveryPurchaseUnits = deliveryPurchase.Delivery?.PurchaseUnits.Select(pu => new PurchaseUnitViewModel(pu)).ToList();
        }

        public string Address { get; set; }

        public List<ContactViewModel> Contacts { get; set; }

        public DateTime? Date { get; set; }

        public byte TimeFrom { get; set; }

        public byte TimeTo { get; set; }

        public string Notes { get; set; }

        public Guid? DeliveryId { get; set; }

        public NameId Driver { get; set; }

        public List<PurchaseUnitViewModel> DeliveryPurchaseUnits { get; set; }
    }
}
