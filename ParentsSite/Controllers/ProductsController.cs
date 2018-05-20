using Domain.Exceptions;
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
    public class ProductsController : BaseController
    {
        private ProductsManager _productsManager;
        public ProductsController(ProductsManager productsManager, UserManager<User> userManager) : base(userManager)
        {
            _productsManager = productsManager;
        }

        [HttpGet]
        public EntitListViewModel<Product> Get(PageInfo pageInfo)
        {
            if (pageInfo == null)
            {
                pageInfo = new PageInfo();
            }

            pageInfo.ItemsCount = _productsManager.GetProductsCount();
            var products = _productsManager.GetAllProducts(pageInfo);

            return new EntitListViewModel<Product> { PageInfo = pageInfo, Entities = products };
        }

        [HttpGet("{id}")]
        public Product Get(Guid id)
        {
            return _productsManager.GetProduct(id);
        }

        [HttpPost]
        public JsonResult Post([FromBody] ProductViewModel product)
        {
            if (product == null)
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Объект не получен." });
            }

            if (_productsManager.EntityExist(product))
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Продукт с таким названием уже существует." });
            }

            try
            {
                _productsManager.Create(product);
            }
            catch (EntityNotFoundException ex)
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = ex.Message });
            }
            catch (Exception)
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Произошла внутренняя ошибка" });
            }

            return Json(new JsonResponse { Code = ResponseCodes.Ok });
        }

        [HttpPut]
        public JsonResult Put([FromBody] ProductViewModel product)
        {
            if (product == null)
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Объект не получен." });
            }

            if (!_productsManager.EntityExist(product))
            {
                return Json(new JsonResponse { Code = ResponseCodes.Error, Desc = "Такого продукта не существует." });
            }

            _productsManager.Update(product);

            return Json(new JsonResponse { Code = ResponseCodes.Ok });
        }

        [HttpDelete]
        public JsonResult Delete([FromQuery]Guid id)
        {
            _productsManager.Delete(id);

            return Json(new JsonResponse { Code = ResponseCodes.Ok });
        }
    }
}
