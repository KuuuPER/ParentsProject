using System;
using Microsoft.AspNetCore.Identity;
using ParentsSite.Models;
using ParentsSite.Managers;
using Microsoft.AspNetCore.Mvc;
using ParentsSite.ViewModels;
using System.Collections.Generic;

namespace ParentsSite.Controllers
{
    [Route("api/[controller]")]
    public class DeliveriesController : BaseController
    {
        private DeliveriesManager _deliveriesManager;

        public DeliveriesController(UserManager<User> userManager, DeliveriesManager deliveriesManager) : base(userManager)
        {
            _deliveriesManager = deliveriesManager;
        }

        [HttpGet]
        public JsonResult Get(PageInfo pageInfo)
        {
            if (pageInfo == null)
            {
                pageInfo = new PageInfo();
            }

            pageInfo.ItemsCount = _deliveriesManager.GetCount();
            var deliveries = _deliveriesManager.GetAllDeliveries(pageInfo);

            return Json(new JsonResponse { Code = ResponseCodes.Ok, Data = new EntitListViewModel<DeliveryViewModel> { PageInfo = pageInfo, Entities = deliveries } });
        }

        [HttpGet("{id}")]
        public JsonResult Get(Guid id)
        {
            var delivery = _deliveriesManager.GetDeliveryByIdEager(id);

            if (delivery == null)
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Такая доставка не существует." });
            }

            return Json(new JsonResponse { Code = ResponseCodes.Ok, Data = new DeliveryViewModel(delivery) });
        }

        [HttpGet("Purchases")]
        public JsonResult Purchases(Guid? deliveryId)
        {
            List<DeliveryPurchaseViewModel> purchases;
            if (deliveryId != null)
            {
                if (!_deliveriesManager.EntityExist(deliveryId))
                {
                    return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Доставка с таким названием не существует." });
                }

                purchases = _deliveriesManager.GetPurchasesByDeliveryId(deliveryId.Value);
            }
            else
            {
                purchases = _deliveriesManager.GetDeliveryPurchases();
            }            

            return Json(new JsonResponse { Code = ResponseCodes.Ok, Data = new EntitListViewModel<DeliveryPurchaseViewModel> { Entities = purchases } });
        }

        [HttpGet("PurchaseUnits/{deliveryId}")]
        public JsonResult PurchaseUnits([FromQuery]PageInfo pageInfo, Guid deliveryId)
        {
            if (!_deliveriesManager.EntityExist(deliveryId))
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Доставка с таким названием не существует." });
            }

            var purchaseUnits = _deliveriesManager.GetPurchaseUnitsByDeliveryId(pageInfo, deliveryId);

            return Json(new JsonResponse { Code = ResponseCodes.Ok, Data = new EntitListViewModel<PurchaseUnitViewModel> { PageInfo = pageInfo, Entities = purchaseUnits } });
        }

        [HttpPost]
        public JsonResult Post([FromBody] DeliveryViewModel deliveryViewModel)
        {
            if (deliveryViewModel == null)
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Объект не получен." });
            }

            _deliveriesManager.Create(deliveryViewModel);

            return Json(new JsonResponse { Code = ResponseCodes.Ok });
        }

        [HttpPut]
        public JsonResult Put([FromBody] DeliveryViewModel deliveryViewModel)
        {
            if (deliveryViewModel == null)
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Объект не получен." });
            }

            if (!_deliveriesManager.EntityExist(deliveryViewModel.Id))
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Такая доставка не существует." });
            }

            _deliveriesManager.Update(deliveryViewModel);

            return Json(new JsonResponse { Code = ResponseCodes.Ok });
        }

        [HttpDelete]
        public JsonResult Delete([FromQuery]Guid id)
        {
            _deliveriesManager.Delete(id);

            return Json(new JsonResponse { Code = ResponseCodes.Ok });
        }
    }
}
