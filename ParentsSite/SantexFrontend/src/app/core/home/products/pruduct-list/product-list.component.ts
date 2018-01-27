import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromProducts from '../store/products.reducers';
import * as ProductActions from '../store/products.actions';
import { ProductModel } from '../src/ProductModel';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productsState: Observable<fromProducts.State>;

  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  public editedProduct: ProductModel = null;

  Arr = Array;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromProducts.FeatureState>    
  ) { }

  ngOnInit() {
    this.productsState = this.store.select('products');
    //this.store.dispatch(new ProductActions.FetchProducts())
  }

  addProduct(){

  }

  editProduct(product: ProductModel){
    this.editedProduct = new ProductModel(product.Id, product.Name, product.Category, product.Manufacture, product.Provider, product.Count);
  }

  deleteProduct(index: number){
    debugger;
    this.store.dispatch(new ProductActions.DeleteProduct(index));
  }

  saveProduct(index: number){
    debugger;
    this.store.dispatch(new ProductActions.EditProduct({ index: index, product: this.editedProduct }));
    this.editedProduct = null;
  }

  cancel(){
    this.editedProduct = null;
  }

  loadTemplate(product: ProductModel){
    if (this.editedProduct && this.editedProduct.Id == product.Id) {
      return this.editTemplate;
    }
    else{
      return this.readOnlyTemplate;
    }
  }
}