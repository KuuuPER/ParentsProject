import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromSelectors from '../store/reducers/products.selectors';
import * as fromReducers from '../store/reducers';
import * as ProductActions from '../store/products.actions';
import { ProductModel } from '../src/ProductModel';
import { INameId } from '../../src/INameId';
import { CategoryModel } from '../../categories/src/CategoryModel';
import { ManufactureModel } from '../../manufactures/src/ManufactureModel';
import { ProviderModel } from '../../providers/src/ProviderModel';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  
  products: Observable<ProductModel[]>;
  categories: Observable<CategoryModel[]>;
  manufactures: Observable<ManufactureModel[]>;
  providers: Observable<ProviderModel[]>;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromReducers.FeatureState>) { }

  ngOnInit() {
    this.products = this.store.select(fromSelectors.getAllProducts);
    this.categories = this.store.select(fromSelectors.getAllCategories);
    this.manufactures = this.store.select(fromSelectors.getAllManufactures);
    this.providers = this.store.select(fromSelectors.getAllProviders);

    this.initForm();
  }

  initForm(){
    let productName = '';
    let category = new FormGroup({
      'id': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required)
    });
    let manufacture = new FormGroup({
      'id': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required)
    });
    let provider = new FormGroup({
      'id': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required)
    });
    let count = 0;

    this.productForm = new FormGroup({
      'name': new FormControl(productName, Validators.required),
      'category': category,
      'manufacture': manufacture,
      'provider': provider,
      'count': new FormControl(count, Validators.required),
      'description': new FormControl('')
    });    
  }

  onProviderSelect(selectedProvider: INameId){
      let provider = <FormGroup>this.productForm.get('provider');
      provider.setControl('id', new FormControl(selectedProvider.id, Validators.required))
      provider.setControl('name', new FormControl(selectedProvider.name, Validators.required));
  }

  onManufactureSelect(selectedManufacture: INameId){
      let manufacture = <FormGroup>this.productForm.get('manufacture');
      manufacture.setControl('id', new FormControl(selectedManufacture.id, Validators.required));
      manufacture.setControl('name', new FormControl(selectedManufacture.name, Validators.required));
  }

  onCategorySelect(selectedCategory: INameId){
    let category = <FormGroup>this.productForm.get('category');
      category.setControl('id', new FormControl(selectedCategory.id, Validators.required));
      category.setControl('name', new FormControl(selectedCategory.name, Validators.required));
  }

  addProduct(){
    let newProduct = <ProductModel>this.productForm.value;
    this.store.dispatch(new ProductActions.AddProduct(newProduct))
    this.onCancel();
  }
  
  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
