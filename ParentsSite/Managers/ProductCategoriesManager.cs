using Domain.Models;
using Services;
using System.Collections.Generic;
using System;
using System.Linq;
using ParentsSite.ViewModels;

namespace ParentsSite.Managers
{
    public class ProductCategoriesManager
    {
        private ProductCategoriesService _productCategoriesService;

        public ProductCategoriesManager(ProductCategoriesService productCategoriesService)
        {
            _productCategoriesService = productCategoriesService;
        }

        public int GetProductsCount()
        {
            return _productCategoriesService.GetCount();
        }

        public IEnumerable<ProductCategory> GetAllProducts(PageInfo pageInfo)
        {
            return _productCategoriesService.Get()
                .Skip((pageInfo.CurrentPage - 1) * pageInfo.ItemsPerPage)
                .Take(pageInfo.ItemsPerPage);
        }

        public IEnumerable<ProductCategory> GetAllCategories()
        {
            return _productCategoriesService.GetAll();
        }

        public ProductCategory GetCategoryById(Guid id)
        {
            return _productCategoriesService.GetEntityById(id);
        }

        public bool CategoryExist(INameId category)
        {
            return _productCategoriesService.EntityExist(category);
        }

        public void CreateCategory(ProductCategory category)
        {
            _productCategoriesService.CreateEntity(category);
        }

        public void Update(ProductCategory category)
        {
            var existedCategory = _productCategoriesService.GetEntityById(category.Id);
            existedCategory.Name = category.Name;

            _productCategoriesService.UpdateEntity(existedCategory);            
        }

        public void Delete(Guid categoryId)
        {
            var existedCategory = _productCategoriesService.GetEntityById(categoryId);

            if (existedCategory != null)
            {
                _productCategoriesService.DeleteEntity(existedCategory);
            }
        }
    }
}
