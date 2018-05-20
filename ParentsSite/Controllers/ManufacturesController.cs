using System;
using Microsoft.AspNetCore.Identity;
using ParentsSite.Models;
using ParentsSite.Managers;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using ParentsSite.ViewModels;

namespace ParentsSite.Controllers
{
    [Route("api/[controller]")]
    public class ManufacturesController : BaseController
    {
        ManufacturesManager _manufacturesManager;

        public ManufacturesController(UserManager<User> userManager, ManufacturesManager manufacturesManager) : base(userManager)
        {
            _manufacturesManager = manufacturesManager;
        }

        [HttpGet]
        public EntitListViewModel<Manufacture> Get(PageInfo pageInfo)
        {
            if (pageInfo == null)
            {
                pageInfo = new PageInfo();
            }

            pageInfo.ItemsCount = _manufacturesManager.GetCount();
            var manufactures = _manufacturesManager.GetPage(pageInfo);

            return new EntitListViewModel<Manufacture> { PageInfo = pageInfo, Entities = manufactures };
        }

        [HttpGet("{id}")]
        public Manufacture Get(Guid id)
        {
            return _manufacturesManager.GetById(id);
        }

        [HttpPost]
        public JsonResult Post([FromBody] Manufacture manufacture)
        {
            if (manufacture == null)
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Объект не получен." });
            }

            if (_manufacturesManager.EntityExist(manufacture))
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Производитель с таким названием уже существует." });
            }

            _manufacturesManager.Create(manufacture);

            return Json(new JsonResponse { Code = ResponseCodes.Ok });
        }

        [HttpPut]
        public JsonResult Put([FromBody] Manufacture manufacture)
        {
            if (manufacture == null)
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Объект не получен." });
            }

            if (!_manufacturesManager.EntityExist(manufacture))
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Такой производитель не существует." });
            }

            _manufacturesManager.Update(manufacture);

            return Json(new JsonResponse { Code = ResponseCodes.Ok });
        }

        [HttpDelete]
        public JsonResult Delete([FromQuery]Guid id)
        {
            _manufacturesManager.Delete(id);

            return Json(new JsonResponse { Code = ResponseCodes.Ok });
        }
    }
}
