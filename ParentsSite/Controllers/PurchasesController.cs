using System;
using Microsoft.AspNetCore.Identity;
using ParentsSite.Models;
using ParentsSite.Managers;
using Microsoft.AspNetCore.Mvc;
using ParentsSite.ViewModels;
using Domain.Models;

namespace ParentsSite.Controllers
{
    [Route("api/[controller]")]
    public class PurchasesController : BaseController
    {
        private PurchasesManager _purchasesManager;

        public PurchasesController(UserManager<User> userManager, PurchasesManager purchasesManager) : base(userManager)
        {
            _purchasesManager = purchasesManager;
        }

        [HttpGet]
        public JsonResult Get(PageInfo pageInfo)
        {
            if (pageInfo == null)
            {
                pageInfo = new PageInfo();
            }

            pageInfo.ItemsCount = _purchasesManager.GetCount();
            var purchases = _purchasesManager.GetAllPurchases(pageInfo);

            return Json(new JsonResponse { Code = ResponseCodes.Ok, Data = new EntitListViewModel<PurchaseViewModel> { PageInfo = pageInfo, Entities = purchases } });
        }

        [HttpGet("{id}")]
        public JsonResult Get(Guid id)
        {
            var purchase = _purchasesManager.GetPurchaseEagerById(id);

            if (purchase == null)
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Такая покупка не существует." });
            }

            return Json(new JsonResponse { Code = ResponseCodes.Ok, Data = new PurchaseViewModel(purchase) });
        }

        [HttpGet("Deliveries")]
        public JsonResult Deliveries([FromQuery]PageInfo pageInfo)
        {
            var deliveries = _purchasesManager.GetDeliveries(pageInfo);

            return Json(new JsonResponse { Code = ResponseCodes.Ok, Data = new EntitListViewModel<PurchaseDeliveryViewModel> { PageInfo = pageInfo, Entities = deliveries } });
        }

        [HttpGet("Deliveries/{purchaseId}")]
        public JsonResult Deliveries([FromQuery]PageInfo pageInfo, Guid purchaseId)
        {
            if (!_purchasesManager.EntityExist(purchaseId))
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Покупка с таким названием не существует." });
            }

            var deliveries = _purchasesManager.GetDeliveriesByPurchaseId(pageInfo, purchaseId);

            return Json(new JsonResponse { Code = ResponseCodes.Ok, Data = new EntitListViewModel<DeliveryViewModel> { PageInfo = pageInfo, Entities = deliveries } });
        }

        [HttpGet("PurchaseUnits/{purchaseId}")]
        public JsonResult PurchaseUnits([FromQuery]PageInfo pageInfo, Guid purchaseId)
        {
            if (!_purchasesManager.EntityExist(purchaseId))
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Покупка с таким названием не существует." });
            }

            var purchaseUnits = _purchasesManager.GetPurchaseUnitsByPurchaseId(pageInfo, purchaseId);

            return Json(new JsonResponse { Code = ResponseCodes.Ok, Data = new EntitListViewModel<PurchaseUnitViewModel> { PageInfo = pageInfo, Entities = purchaseUnits } });
        }

        [HttpPost]
        public JsonResult Post([FromBody] PurchaseViewModel purchaseViewModel)
        {
            if (purchaseViewModel == null)
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Объект не получен." });
            }

            _purchasesManager.Create(purchaseViewModel);

            return Json(new JsonResponse { Code = ResponseCodes.Ok });
        }

        [HttpPut]
        public JsonResult Put([FromBody] PurchaseViewModel purchaseViewModel)
        {
            if (purchaseViewModel == null)
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Объект не получен." });
            }

            if (!_purchasesManager.EntityExist(purchaseViewModel.Id))
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Такая покупка не существует." });
            }

            _purchasesManager.Update(purchaseViewModel);

            return Json(new JsonResponse { Code = ResponseCodes.Ok });
        }

        [HttpDelete]
        public JsonResult Delete([FromQuery]Guid id)
        {
            _purchasesManager.Delete(id);

            return Json(new JsonResponse { Code = ResponseCodes.Ok });
        }
    }
}
