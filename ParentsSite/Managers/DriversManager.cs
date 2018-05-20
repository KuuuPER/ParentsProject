using Domain.Models;
using ParentsSite.ViewModels;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ParentsSite.Managers
{
    public class DriversManager : NameIdManager<Driver>
    {
        private DeliveriesService _deliveriesService;
        private DriversService _driversService;

        public DriversManager(DriversService driversService, DeliveriesService deliveriesService) : base(driversService)
        {
            _deliveriesService = deliveriesService;
            _driversService = driversService;
        }

        public List<DriverViewModel> GetAllDrivers(PageInfo pageInfo)
        {
            if (pageInfo == null)
            {
                return _service.Get(includeProperties: $"{nameof(Driver.Deliveries)}").Select(d => new DriverViewModel(d)).ToList();
            }

            return _service.Get(includeProperties: $"{nameof(Driver.Deliveries)}")
                .Skip((pageInfo.CurrentPage - 1) * pageInfo.ItemsPerPage)
                .Take(pageInfo.ItemsPerPage).Select(d => new DriverViewModel(d)).ToList();
        }

        public List<DeliveryViewModel> GetDriverDeliveries(PageInfo pageInfo,Guid driverId)
        {
            return GetDriverByIdEager(driverId).Deliveries
                .Skip((pageInfo.CurrentPage - 1) * pageInfo.ItemsPerPage)
                .Take(pageInfo.ItemsPerPage)
                .Select(d => new DeliveryViewModel(d))
                .ToList();
        }

        public Driver GetDriverByIdEager(Guid id)
        {
            return _driversService.GetDriverByIdEager(id);
        }

        public void Update(DriverViewModel driver)
        {
            var existedDriver = _service.GetEntityById(driver.Id);
            existedDriver.Name = driver.Name;
            existedDriver.Notes = driver.Notes;
            existedDriver.Rate = driver.Rate;
            
            var deliveries = new List<Delivery>(driver.Deliveries?.Count ?? 0);

            if (driver.Deliveries != null)
            {
                foreach (var deliveryVM in driver.Deliveries)
                {
                    var delivery = _deliveriesService.GetEntityById(deliveryVM.Id);

                    if (delivery != null)
                    {
                        deliveries.Add(delivery);
                    }
                }
            }

            existedDriver.Deliveries = deliveries;            
            _service.UpdateEntity(existedDriver);
        }

        public Driver GetDriver(Guid id)
        {
            return _service.GetEntityById(id);
        }

        public void Create(DriverViewModel driverVM)
        {
            var driver = new Driver
            {
                Name = driverVM.Name,
                Notes = driverVM.Notes,
                Rate = driverVM.Rate
            };

            var deliveries = new List<Delivery>(driverVM.Deliveries?.Count ?? 0);
            if (driverVM.Deliveries != null)
            {
                foreach (var deliveryVM in driverVM.Deliveries)
                {
                    var delivery = _deliveriesService.GetEntityById(deliveryVM.Id);
                    deliveries.Add(delivery);
                }
            }
            

            driver.Deliveries = deliveries;

            _service.CreateEntity(driver);
        }
    }
}
