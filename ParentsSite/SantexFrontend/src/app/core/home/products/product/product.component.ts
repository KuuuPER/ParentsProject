import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromProducts from '../store/products.reducers';
import * as ProductActions from '../store/products.actions';
import { ProductModel } from '../src/ProductModel';
import { INameId } from '../../src/INameId';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  
  productsState: Observable<fromProducts.State>;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromProducts.FeatureState>) { }

  ngOnInit() {
    this.productsState = this.store.select('products');

    this.initForm();
  }

  initForm(){
    let productName = '';
    let category = new FormGroup({
      'Id': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required)
    });
    let manufacture = new FormGroup({
      'Id': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required)
    });
    let provider = new FormGroup({
      'Id': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required)
    });
    let count = 0;

    this.productForm = new FormGroup({
      'Name': new FormControl(productName, Validators.required),
      'Category': category,
      'Manufacture': manufacture,
      'Provider': provider,
      'Count': new FormControl(count, Validators.required),
    });    
  }

  onProviderSelect(selectedProvider: INameId){
      let provider = <FormGroup>this.productForm.get('Provider');
      provider.setControl('Id', new FormControl(selectedProvider.Id, Validators.required))
      provider.setControl('Name', new FormControl(selectedProvider.Name, Validators.required));
  }

  onManufactureSelect(selectedManufacture: INameId){
      let manufacture = <FormGroup>this.productForm.get('Manufacture');
      manufacture.setControl('Id', new FormControl(selectedManufacture.Id, Validators.required));
      manufacture.setControl('Name', new FormControl(selectedManufacture.Name, Validators.required));
  }

  onCategorySelect(selectedCategory: INameId){
    let category = <FormGroup>this.productForm.get('Category');
      category.setControl('Id', new FormControl(selectedCategory.Id, Validators.required));
      category.setControl('Name', new FormControl(selectedCategory.Name, Validators.required));
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
