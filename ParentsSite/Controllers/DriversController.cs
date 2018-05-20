using System;
using Microsoft.AspNetCore.Identity;
using ParentsSite.Models;
using ParentsSite.Managers;
using Microsoft.AspNetCore.Mvc;
using ParentsSite.ViewModels;

namespace ParentsSite.Controllers
{
    [Route("api/[controller]")]
    public class DriversController : BaseController
    {
        private DriversManager _driversManager;

        public DriversController(UserManager<User> userManager, DriversManager driversManager) : base(userManager)
        {
            _driversManager = driversManager;
        }

        [HttpGet]
        public JsonResult Get(PageInfo pageInfo)
        {
            if (pageInfo == null)
            {
                pageInfo = new PageInfo();
            }

            pageInfo.ItemsCount = _driversManager.GetCount();
            var drivers = _driversManager.GetAllDrivers(pageInfo);

            return Json(new JsonResponse { Code = ResponseCodes.Ok, Data = new EntitListViewModel<DriverViewModel> { PageInfo = pageInfo, Entities = drivers } });
        }

        [HttpGet("{id}")]
        public JsonResult Get(Guid id)
        {
            var driver = _driversManager.GetDriver(id);

            if (driver == null)
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Такой водитель не существует." });
            }

            return Json(new JsonResponse { Code = ResponseCodes.Ok, Data = new DriverViewModel(driver) });
        }

        [HttpGet("Deliveries/{driverId}")]
        public JsonResult Products([FromQuery]PageInfo pageInfo, Guid driverId)
        {
            if (!_driversManager.EntityExist(driverId))
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Водитель с таким именем не существует." });
            }

            var deliveries = _driversManager.GetDriverDeliveries(pageInfo, driverId);

            return Json(new JsonResponse { Code = ResponseCodes.Ok, Data = new EntitListViewModel<DeliveryViewModel> { PageInfo = pageInfo, Entities = deliveries } });
        }

        [HttpPost]
        public JsonResult Post([FromBody] DriverViewModel driverViewModel)
        {
            if (driverViewModel == null)
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Объект не получен." });
            }

            if (_driversManager.EntityExist(driverViewModel))
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Водитель с таким именем уже существует." });
            }

            _driversManager.Create(driverViewModel);

            return Json(new JsonResponse { Code = ResponseCodes.Ok });
        }

        [HttpPut]
        public JsonResult Put([FromBody] DriverViewModel driverViewModel)
        {
            if (driverViewModel == null)
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Объект не получен." });
            }

            if (!_driversManager.EntityExist(driverViewModel.Id))
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Такой водитель не существует." });
            }

            _driversManager.Update(driverViewModel);

            return Json(new JsonResponse { Code = ResponseCodes.Ok });
        }

        [HttpDelete]
        public JsonResult Delete([FromQuery]Guid id)
        {
            _driversManager.Delete(id);

            return Json(new JsonResponse { Code = ResponseCodes.Ok });
        }
    }
}
