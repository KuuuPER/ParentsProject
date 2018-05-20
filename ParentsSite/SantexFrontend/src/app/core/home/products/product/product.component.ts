import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { Store, ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import * as fromSelectors from '../store/reducers/products.selectors';
import * as fromReducers from '../store/reducers';
import * as fromProducts from '../store/reducers/products.reducers';
import * as ProductActions from '../store/products.actions';
import * as CategoriesActions from '../../categories/store/categories.actions';
import * as ManufacturesActions from '../../manufactures/store/manufactures.actions';
import * as ProvidersActions from '../../providers/store/providers.actions';
import { ProductModel } from '../src/ProductModel';
import { INameId } from '../../src/INameId';
import { CategoryModel } from '../../categories/src/CategoryModel';
import { ManufactureModel } from '../../manufactures/src/ManufactureModel';
import { ProviderModel } from '../../providers/src/ProviderModel';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/skip';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public productForm: FormGroup;
  
  public products: Observable<ProductModel[]>;
  public categories: Observable<CategoryModel[]>;
  public manufactures: Observable<ManufactureModel[]>;
  public providers: Observable<ProviderModel[]>;

  private id: string;
  private product: Observable<ProductModel>;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromReducers.FeatureState>,
    private dispatcher: ActionsSubject) {
      this.products = this.store.select(fromSelectors.getAllProducts);
      this.categories = this.store.select(fromSelectors.getAllCategories);
      this.manufactures = this.store.select(fromSelectors.getAllManufactures);
      this.providers = this.store.select(fromSelectors.getAllProviders);
      this.product = this.store.select(fromSelectors.getEditProduct);
      
      this.store.dispatch(new CategoriesActions.FetchCategories());
      this.store.dispatch(new ProvidersActions.FetchProviders());
      this.store.dispatch(new ManufacturesActions.FetchManufactures());
    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['id'] !== undefined) {
        this.id = params['id'];
        
        this.store.dispatch(new ProductActions.GetProduct(this.id));
        this.product.skip(1).take(1)
        .subscribe(p => {
          this.initForm(<ProductModel>p);
        });
      }
      else{
        this.initForm();
      }
    });   
  }

  initForm(product: ProductModel = null){
    if (product === null) {
      product = new ProductModel('', '', '', { id: '', name: ''}, { id: '', name: '' }, { id: '', name: '' }, 0, 0, 0, null);
    }

    let category = new FormGroup({'id': new FormControl(product.category.id, Validators.required),
    'name': new FormControl(product.category.name, Validators.required)});
    let manufacture = new FormGroup({'id': new FormControl(product.manufacture.id, Validators.required),
    'name': new FormControl(product.manufacture.name, Validators.required)});
    let provider = new FormGroup({'id': new FormControl(product.provider.id, Validators.required),
    'name': new FormControl(product.provider.name, Validators.required)});

    this.productForm = new FormGroup({
      'name': new FormControl(product.name, Validators.required),
      'category': category,
      'manufacture': manufacture,
      'provider': provider,
      'providerPrice': new FormControl(product.providerPrice, Validators.required),
      'storePrice': new FormControl(product.storePrice, Validators.required),
      'vendorCode': new FormControl(product.vendorCode, Validators.required),
      'count': new FormControl(product.count, Validators.required),
      'description': new FormControl(product.description)
    });
  }

  addProduct(){
    let newProduct = <ProductModel>this.productForm.value;
       if (this.product != null) {
        newProduct.id = this.id;
        this.store.dispatch(new ProductActions.EditProduct({product: newProduct, id: this.id}));
      }
      else{
        this.store.dispatch(new ProductActions.AddProduct(newProduct));
      }
  }
  
  onCancel(){
    this.router.navigate(['/home/products']);
  }
}
