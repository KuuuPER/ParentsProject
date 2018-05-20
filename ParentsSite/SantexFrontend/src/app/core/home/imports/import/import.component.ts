import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromImports from '../store/reducers/imports.reducers';
import * as fromReducers from '../store/reducers';
import * as fromSelectors from '../store/reducers/imports.selectors';
import * as ImportActions from '../store/imports.actions';
import * as ProvidersActions from '../../providers/store/providers.actions';
import * as ProductsActions from '../../products/store/products.actions';
import * as fromProducts from '../../products/store/reducers/products.reducers';
import { ImportModel } from '../src/ImportModel';
import { ImportStatus } from '../src/ImportStatus'
import { INameId } from '../../src/INameId';
import { ProductModel } from '../../products/src/ProductModel';
import { IMyOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker/interfaces';
import { PageInfo } from '../../src/PageInfo';
import { ProviderModel } from '../../providers/src/ProviderModel';
import { ImportProductModel } from '../src/ImportProductModel';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  public imports: Observable<ImportModel[]>;
  public providers: Observable<ProviderModel[]>;
  public productsPageInfo: Observable<PageInfo>;
  public importProductsPageInfo: Observable<PageInfo>;
  public productsState: Observable<ProductModel[]>;
  public importProducts: Observable<ProductModel[]>;
  public id: string;
  public editedImport: Store<ImportModel>;
  public importForm: FormGroup;  
  
  public provider: Observable<ProviderModel>;
  public importDate = new Date();

  public myDatePickerOptions: IMyOptions = {
      dateFormat: 'dd.mm.yyyy',
      height: '34px',
      width: '210px',
      inline: false
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromReducers.FeatureState>
  ) { }

  ngOnInit() {
    this.providers = this.store.select(fromSelectors.getAllProviders);
    this.productsState = this.store.select(fromSelectors.getAllProducts);
    this.productsPageInfo = this.store.select(fromSelectors.getProductsPageInfo);
    this.importProducts = this.store.select(fromSelectors.getImportProducts)
    this.importProductsPageInfo = this.store.select(fromSelectors.getImportProductsPageInfo);
    this.editedImport = this.store.select(fromSelectors.getEditImport);    

    this.store.dispatch(new ProvidersActions.FetchProviders());
    this.store.dispatch(new ProductsActions.FetchProducts());
    this.provider = this.providers.map(p => p[0]);
    
    this.route.params.subscribe((params: Params) => {
      if (params['id'] !== undefined) {
        this.id = params['id'];

        this.initEditForm();
      }
      else{
        this.initForm();
      }
    });
  }

  initEditForm(){
    this.store.dispatch(new ImportActions.GetImport(this.id));
        this.editedImport.take(1)
        .subscribe(c => {
          this.initForm(<ImportModel>c);
        });
        this.importProductsPageInfo.take(1).subscribe((pageInfo) => {
          this.store.dispatch(new ImportActions.FetchImportProducts({pageInfo: pageInfo, importId: this.id}));
        });
  }

  initForm(importModel: ImportModel = null){
    if (importModel === null) {
      importModel = new ImportModel('', {id: '', name: ''}, [], new Date(), new Date(), new Date(), ImportStatus.New);
    }

    let provider = new FormGroup({
      'id': new FormControl(importModel.provider.id, Validators.required),
      'name': new FormControl(importModel.provider.name, Validators.required)
    });

    let count = 0;

    this.importForm = new FormGroup({
      'provider': provider,
      'importDate': new FormControl(importModel.importDate, Validators.required),
      'createdDate': new FormControl(importModel.createdDate, Validators.required),
      'finishDate': new FormControl(importModel.finishDate),
    });
  }

  public createdDate: Date = new Date();
  onCreatedDateChanged(dateModel: IMyDateModel){
    this.createdDate = new Date(dateModel.date.year, dateModel.date.month, dateModel.date.day);
    this.setControlDate('createdDate', dateModel);
  }

  onImportDateChanged(dateModel: IMyDateModel){
    this.importDate = new Date(dateModel.date.year, dateModel.date.month, dateModel.date.day);
    this.setControlDate('importDate', dateModel);
  }

  public finishDate: Date = new Date();
  onFinishDateChanged(dateModel: IMyDateModel){
    this.finishDate = new Date(dateModel.date.year, dateModel.date.month, dateModel.date.day);
    this.setControlDate('finishDate', dateModel);
  }

  setControlDate(controlName:string, dateModel: IMyDateModel){
    let date = (new Date(dateModel.date.year, dateModel.date.month, dateModel.date.day)).toISOString();
    this.importForm.setControl(controlName, new FormControl(date, Validators.required));
  }

  addProductToImport(product: ProductModel){
    if (product.count > 0) {
      this.store.dispatch(new ImportActions.AddProduct(product));
    }
  }

  deleteProductFromImport(product: ProductModel){
    this.store.dispatch(new ImportActions.DeleteProduct(product.id));    
  }

  clearImportProducts(){
    this.store.dispatch(new ImportActions.ClearImportProducts({}));
  }

  onImportProductsPageClicked(pageInfo: PageInfo){
    this.store.dispatch(new ImportActions.FetchImportProducts({pageInfo: pageInfo, importId: this.id}));    
  }

  onPageClicked(pageInfo: PageInfo){
    this.store.dispatch(new ProductsActions.FetchProducts(pageInfo))
    this.store.dispatch(new ProductsActions.ChangePage(pageInfo.currentPage));
  }

  addImport(){
    if (this.id) {
      let importModel: ImportModel;
      this.editedImport.take(1).subscribe(item => {
        importModel = item;
      });

      this.importProducts.take(1).subscribe(item => {
        importModel.products = item.map(p => <ImportProductModel>{ productId: p.id, count: p.count });
      });

      this.store.dispatch(new ImportActions.EditImport({id: this.id, import: importModel}));
    }
    else{
      let newImport = <ImportModel>this.importForm.value;
        newImport.createdDate = this.createdDate;
        newImport.importDate = this.importDate;
        newImport.finishDate = this.finishDate;

      this.importProducts.take(1).subscribe(item => {
        newImport.products = item.map(p => <ImportProductModel>{ productId: p.id, count: p.count });
      });

      this.store.dispatch(new ImportActions.AddImport(newImport));
    }
  }
}
