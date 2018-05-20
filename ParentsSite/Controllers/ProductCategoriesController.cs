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
    public class ProductCategoriesController : BaseController
    {
        private ProductCategoriesManager _productCategoriesManager;
        public ProductCategoriesController(ProductCategoriesManager categoryManager, UserManager<User> userManager) : base(userManager)
        {
            _productCategoriesManager = categoryManager;
        }

        [HttpGet]
        public EntitListViewModel<ProductCategory> Get(PageInfo pageInfo)
        {
            if (pageInfo == null)
            {
                pageInfo = new PageInfo();
            }

            pageInfo.ItemsCount = _productCategoriesManager.GetProductsCount();
            var categories = _productCategoriesManager.GetAllProducts(pageInfo);

            return new EntitListViewModel<ProductCategory> { PageInfo = pageInfo, Entities = categories };
        }

        [HttpGet("{id}")]
        public ProductCategory Get(Guid id)
        {
            return _productCategoriesManager.GetCategoryById(id);
        }

        [HttpPost]
        public JsonResult Post([FromBody] ProductCategory category)
        {
            if (category == null)
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Объект не получен." });
            }

            if (_productCategoriesManager.CategoryExist(category))
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Категория с таким названием уже существует." });
            }

            _productCategoriesManager.CreateCategory(category);

            return Json(new JsonResponse { Code = ResponseCodes.Ok });
        }

        [HttpPut]
        public JsonResult Put([FromBody] ProductCategory category)
        {
            if (category == null)
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Объект не получен." });
            }

            if (!_productCategoriesManager.CategoryExist(category))
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Такой категории не существует." });
            }

            _productCategoriesManager.Update(category);

            return Json(new JsonResponse { Code = ResponseCodes.Ok });
        }

        [HttpDelete]
        public JsonResult Delete([FromQuery]Guid id)
        {
            _productCategoriesManager.Delete(id);

            return Json(new JsonResponse { Code = ResponseCodes.Ok });
        }
    }
}
