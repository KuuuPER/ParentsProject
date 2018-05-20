using Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ParentsSite.Managers;
using ParentsSite.Models;
using ParentsSite.ViewModels;
using System;

namespace ParentsSite.Controllers
{
    [Route("api/[controller]")]
    public class ProvidersController : BaseController
    {
        private ProvidersManager _providersManager;

        public ProvidersController(UserManager<User> userManager, ProvidersManager providersManager) : base(userManager)
        {
            _providersManager = providersManager;
        }

        [HttpGet]
        public EntitListViewModel<Provider> Get(PageInfo pageInfo)
        {
            if (pageInfo == null)
            {
                pageInfo = new PageInfo();
            }

            pageInfo.ItemsCount = _providersManager.GetCount();
            var providers = _providersManager.GetPage(pageInfo);

            return new EntitListViewModel<Provider> { PageInfo = pageInfo, Entities = providers };
        }

        [HttpGet("{id}")]
        public JsonResult Get(Guid id)
        {
            if (!_providersManager.EntityExist(id))
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Поставщик с таким названием уже существует." });
            }

            var provider = _providersManager.GetProvider(id);

            return Json(new JsonResponse { Code = ResponseCodes.Ok, Data = provider });
        }

        [HttpPost]
        public JsonResult Post([FromBody] ProviderViewModel provider)
        {
            if (provider == null)
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Объект не получен." });
            }

            if (_providersManager.EntityExist(provider.Name))
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Поставщик с таким названием уже существует." });
            }

            _providersManager.Create(provider);

            return Json(new JsonResponse { Code = ResponseCodes.Ok });
        }

        [HttpPut]
        public JsonResult Put([FromBody] ProviderViewModel provider)
        {
            if (provider == null)
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Объект не получен." });
            }

            if (!_providersManager.EntityExist(provider.Id))
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Такой поставщик не существует." });
            }

            _providersManager.Update(provider);

            return Json(new JsonResponse { Code = ResponseCodes.Ok });
        }

        [HttpDelete]
        public JsonResult Delete([FromQuery]Guid id)
        {
            _providersManager.Delete(id);

            return Json(new JsonResponse { Code = ResponseCodes.Ok });
        }
    }
}
