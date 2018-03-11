import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromProducts from '../store/reducers/products.reducers';
import * as fromReducers from '../store/reducers';
import * as fromSelectors from '../store/reducers/products.selectors';
import * as ProductActions from '../store/products.actions';
import { ProductModel } from '../src/ProductModel';
import { INameId } from '../../src/INameId';
import { CategoryModel } from '../../categories/src/CategoryModel';
import { ManufactureModel } from '../../manufactures/src/ManufactureModel';
import { ProviderModel } from '../../providers/src/ProviderModel';
import { PageInfo } from '../../src/PageInfo';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public products: Observable<ProductModel[]>;
  public pageInfo: Observable<PageInfo>;
  public categories: Observable<CategoryModel[]>;
  public manufactures: Observable<ManufactureModel[]>;
  public providers: Observable<ProviderModel[]>;

  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  public editedProduct: ProductModel = null;

  Arr = Array;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromReducers.FeatureState>
  ) { }

  ngOnInit() {
    this.products = this.store.select(fromSelectors.getAllProducts);
    this.pageInfo = this.store.select(fromSelectors.getPageInfo);
    this.categories = this.store.select(fromSelectors.getAllCategories);
    this.manufactures = this.store.select(fromSelectors.getAllManufactures);
    this.providers = this.store.select(fromSelectors.getAllProviders);
    //this.store.dispatch(new ProductActions.FetchProducts())
  }

  editProduct(product: ProductModel){
    debugger;
    this.editedProduct = new ProductModel(
      product.id,
      product.name,
      product.vendorCode,
      product.category,
      product.manufacture,
      product.provider,
      product.count,
      product.providerPrice,
      product.storePrice);
      this.editedProduct.state = product.state;
  }

  deleteProduct(id: string){
    this.store.dispatch(new ProductActions.DeleteProduct(id));
  }

  saveProduct(id: string){
    this.store.dispatch(new ProductActions.EditProduct({ id: id, product: this.editedProduct }));
    this.editedProduct = null;
  }

  onCategorySelect(selectedCategory: INameId){
    this.editedProduct.category = selectedCategory;
  }

  onManufactureSelect(selectedManufacture: INameId){
    this.editedProduct.manufacture = selectedManufacture;
  }

  onProviderSelect(selectedProvider: INameId){
    this.editedProduct.provider = selectedProvider;
  }

  cancel(){
    this.editedProduct = null;
  }

  loadTemplate(product: ProductModel){
    if (this.editedProduct && this.editedProduct.id == product.id) {
      return this.editTemplate;
    }
    else{
      return this.readOnlyTemplate;
    }
  }
}
