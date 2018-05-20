using Domain.Enums;
using Domain.Exceptions;
using Domain.Models;
using ParentsSite.ViewModels;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ParentsSite.Managers
{
    public class ProductsManager: NameIdManager<Product>
    {
        private ProductsService _productsService;
        private ProductCategoriesService _categoriesService;
        private ManufacturesService _manufacturesManager;
        private ProvidersService _providersManager;

        public ProductsManager(ProductsService productsService,
            ProductCategoriesService categoriesService,
            ManufacturesService manufacturesService,
            ProvidersService providersService) : base(productsService)
        {
            _productsService = productsService;
            _categoriesService = categoriesService;
            _manufacturesManager = manufacturesService;
            _providersManager = providersService;
        }

        public int GetProductsCount()
        {
            return _productsService.GetCount();
        }

        public IEnumerable<Product> GetAllProducts(PageInfo pageInfo)
        {
            return _productsService.Get(includeProperties: $"{nameof(Product.Category)},{nameof(Product.Provider)},{nameof(Product.Manufacture)}")
                .Skip((pageInfo.CurrentPage - 1) * pageInfo.ItemsPerPage)
                .Take(pageInfo.ItemsPerPage);
        }

        public Product GetProduct(Guid id)
        {
            if (!_productsService.EntityExist(id))
            {
                throw new EntityNotFoundException(nameof(Product), id);
            }

            return _productsService.Get(filter: p => p.Id == id, includeProperties: $"{nameof(Product.Category)},{nameof(Product.Provider)},{nameof(Product.Manufacture)}").SingleOrDefault();
        }

        public void Create(ProductViewModel productViewModel)
        {
            var product = new Product()
            {
                Name = productViewModel.Name,
                ProviderPrice = productViewModel.ProviderPrice,
                State = productViewModel.State,
                StorePrice = productViewModel.StorePrice,
                VendorCode = productViewModel.VendorCode,
                Count = productViewModel.Count,
                Description = productViewModel.Description
            };

            if (!_categoriesService.EntityExist(productViewModel.Category))
            {
                throw new EntityNotFoundException(nameof(productViewModel.Category), productViewModel.Category.Id);
            }

            var category = _categoriesService.GetEntityById(productViewModel.Category.Id);

            if (!_manufacturesManager.EntityExist(productViewModel.Manufacture))
            {
                throw new EntityNotFoundException(nameof(productViewModel.Manufacture), productViewModel.Manufacture.Id);
            }

            var manufacture = _manufacturesManager.GetEntityById(productViewModel.Manufacture.Id);

            if (!_providersManager.EntityExist(productViewModel.Provider))
            {
                throw new EntityNotFoundException(nameof(productViewModel.Provider), productViewModel.Provider.Id);
            }

            var provider = _providersManager.GetEntityById(productViewModel.Provider.Id);

            product.Category = category;
            product.Manufacture = manufacture;
            product.Provider = provider;

            product.State = ProductState.Awaiting;

            _productsService.CreateEntity(product);
        }

        public void Update(ProductViewModel productViewModel)
        {
            var existedProduct = _productsService.GetEntityById(productViewModel.Id);
            existedProduct.Name = productViewModel.Name;
            existedProduct.ProviderPrice = productViewModel.ProviderPrice;
            existedProduct.State = productViewModel.State;
            existedProduct.StorePrice = productViewModel.StorePrice;
            existedProduct.VendorCode = productViewModel.VendorCode;
            existedProduct.Count = productViewModel.Count;
            existedProduct.Description = productViewModel.Description;

            if (!_categoriesService.EntityExist(productViewModel.Category))
            {
                throw new EntityNotFoundException(productViewModel.Category.Name, productViewModel.Category.Id);
            }

            var category = _categoriesService.GetEntityById(productViewModel.Category.Id);

            if (!_manufacturesManager.EntityExist(productViewModel.Manufacture))
            {
                throw new EntityNotFoundException(productViewModel.Manufacture.Name, productViewModel.Manufacture.Id);
            }

            var manufacture = _manufacturesManager.GetEntityById(productViewModel.Manufacture.Id);

            if (!_providersManager.EntityExist(productViewModel.Provider))
            {
                throw new EntityNotFoundException(productViewModel.Provider.Name, productViewModel.Provider.Id);
            }

            var provider = _providersManager.GetEntityById(productViewModel.Provider.Id);

            existedProduct.Category = category;
            existedProduct.Provider = provider;
            existedProduct.Manufacture = manufacture;

            _productsService.UpdateEntity(existedProduct);            
        }        
    }
}
