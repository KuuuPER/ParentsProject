using Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ParentsSite.Managers;
using ParentsSite.Models;
using ParentsSite.ViewModels;
using System;
using System.Linq;

namespace ParentsSite.Controllers
{
    [Route("api/[controller]")]
    public class ImportController: BaseController
    {
        private ImportsManager _importsManager;

        public ImportController(UserManager<User> userManager, ImportsManager importsManager): base(userManager)
        {
            _importsManager = importsManager;
        }

        [HttpGet]
        public JsonResult Get(PageInfo pageInfo)
        {
            if (pageInfo == null)
            {
                pageInfo = new PageInfo();
            }

            pageInfo.ItemsCount = _importsManager.GetCount();
            var imports = _importsManager.GetAllImports(pageInfo).ToList();

            return Json(new JsonResponse { Code = ResponseCodes.Ok, Data = new EntitListViewModel<ImportViewModel> { PageInfo = pageInfo, Entities = imports } });
        }

        [HttpGet("{id}")]
        public JsonResult Get(Guid id)
        {
            var import = _importsManager.GetImportById(id);

            if (import == null)
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Такой приход не существует." });
            }

            return Json(new JsonResponse { Code = ResponseCodes.Ok, Data = new ImportViewModel(import) });
        }

        [HttpGet("Products/{importId}")]
        public JsonResult Products([FromQuery]PageInfo pageInfo, Guid importId)
        {
            if (!_importsManager.EntityExist(importId))
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Приход с таким названием не существует." });
            }

            var products = _importsManager.GetProducts(pageInfo, importId);

            return Json(new JsonResponse { Code = ResponseCodes.Ok, Data = new EntitListViewModel<ImportProduct> { PageInfo = pageInfo, Entities = products } });
        }

        [HttpPost]
        public JsonResult Post([FromBody] ImportViewModel importViewModel)
        {
            if (importViewModel == null)
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Объект не получен." });
            }

            if (_importsManager.EntityExist(importViewModel.Id))
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Приход с таким названием уже существует." });
            }

            _importsManager.CreateImport(importViewModel);

            return Json(new JsonResponse { Code = ResponseCodes.Ok });
        }

        [HttpPut]
        public JsonResult Put([FromBody] ImportViewModel importViewModel)
        {
            if (importViewModel == null)
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Объект не получен." });
            }

            if (!_importsManager.EntityExist(importViewModel.Id))
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Такой приход не существует." });
            }

            _importsManager.UpdateImport(importViewModel);

            return Json(new JsonResponse { Code = ResponseCodes.Ok });
        }

        [HttpDelete]
        public JsonResult Delete([FromQuery]Guid id)
        {
            _importsManager.Delete(id);

            return Json(new JsonResponse { Code = ResponseCodes.Ok });
        }
    }
}
