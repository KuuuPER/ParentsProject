using Domain.Enums;
using Domain.Models;
using ParentsSite.ViewModels;
using Services;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ParentsSite.Managers
{
    public class ImportsManager : BaseManager<Import>
    {
        ProvidersService _providersService;
        ProductsService _productsService;
        ImportsService _importService;
        ImportProductsService _importProductsService;

        public ImportsManager(ImportsService importService, ProvidersService providersManager, ProductsService productsService, ImportProductsService importProductsService) : base(importService)
        {
            _providersService = providersManager;
            _productsService = productsService;
            _importProductsService = importProductsService;
            _importService = importService;
        }

        public IEnumerable<ImportViewModel> GetAllImports(PageInfo pageInfo)
        {
            if (pageInfo == null)
            {
                return _service.Get(includeProperties: $"{nameof(Import.Provider)},{nameof(Import.Products)}").Select(i => new ImportViewModel(i));
            }

            return _service.Get(includeProperties: $"{nameof(Import.Provider)},{nameof(Import.Products)}")
                .Skip((pageInfo.CurrentPage - 1) * pageInfo.ItemsPerPage)
                .Take(pageInfo.ItemsPerPage).Select(i => new ImportViewModel(i));
        }

        public IEnumerable<ImportProduct> GetProducts(PageInfo pageInfo, Guid importId)
        {
            return _importService.GetImportWithProductsById(importId).Products
                .Skip((pageInfo.CurrentPage - 1) * pageInfo.ItemsPerPage)
                .Take(pageInfo.ItemsPerPage);
        }

        public Import GetImportById(Guid id)
        {
            return _service.GetEntityById(id);
        }

        public void UpdateImport(ImportViewModel importViewModel)
        {
            var existedImport = _importService.GetImportWithProductsById(importViewModel.Id);
            Provider provider = null;

            if (_providersService.EntityExist(importViewModel.Provider))
            {
                provider = _providersService.GetEntityById(importViewModel.Provider.Id);
            }

            List<ImportProduct> products = new List<ImportProduct>(importViewModel.Products?.Count ?? 0);

            foreach (var product in importViewModel.Products)
            {
                if (_productsService.EntityExist(product.ProductId.Value))
                {
                    var importProduct = new ImportProduct();
                    importProduct.Product = _productsService.GetEntityById(product.ProductId.Value);
                    importProduct.Count = product.Count;
                    products.Add(importProduct);
                }
            }

            existedImport.CreatedDate = importViewModel.CreatedDate;
            existedImport.ImportDate = importViewModel.ImportDate;
            existedImport.FinishDate = importViewModel.FinishDate;
            existedImport.Status = importViewModel.Status;
            existedImport.Provider = provider;

            _importProductsService.DeleteEntityRange(existedImport.Products);

            existedImport.Products = products;

            _service.UpdateEntity(existedImport);
        }

        public void CreateImport(ImportViewModel importViewModel)
        {
            var import = new Import
            {
                ImportDate = importViewModel.ImportDate,
                CreatedDate = importViewModel.CreatedDate,
                FinishDate = importViewModel.FinishDate,
                Status = ImportStatus.New
            };

            Provider provider = null;

            if (_providersService.EntityExist(importViewModel.Provider))
            {
                provider = _providersService.GetEntityById(importViewModel.Provider.Id);
            }

            import.Provider = provider;

            List<ImportProduct> importProducts = new List<ImportProduct>(importViewModel.Products?.Count ?? 0);

            foreach (var product in importViewModel.Products)
            {
                if (_productsService.EntityExist(product.ProductId.Value))
                {
                    var importProduct = new ImportProduct();
                    importProduct.Product = _productsService.GetEntityById(product.ProductId.Value);
                    importProduct.Count = product.Count;
                    importProducts.Add(importProduct);
                }
            }

            import.Products = importProducts;

            _service.CreateEntity(import);
        }
    }
}
