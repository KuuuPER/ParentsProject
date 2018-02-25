import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromDeliveries from '../store/deliveries.reducers';
import * as DeliveryActions from '../store/deliveries.actions';
import * as fromProducts from '../../products/store/products.reducers';
import { DeliveryModel, DeliveryStatus } from '../src/DeliveryModel';
import { INameId } from '../../src/INameId';
import { ProductModel } from '../../products/src/ProductModel';
import { IMyOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker/interfaces';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  deliveriesState: Observable<fromDeliveries.State>;
  productsState: Observable<fromProducts.State>;
  deliveryForm: FormGroup;
  driverControlName: 'Driver';

  deliveryProducts: ProductModel[] = new Array<ProductModel>();
  
  public deliveryDate = new Date();

  public myDatePickerOptions: IMyOptions = {
      dateFormat: 'dd.mm.yyyy',
      height: '34px',
      width: '210px',
      inline: false
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromDeliveries.FeatureState>
  ) { }

  ngOnInit() {
    this.deliveriesState = this.store.select('deliveries');
    this.productsState = this.store.select('products');
    //this.store.dispatch(new DeliveryActions.FetchDeliveries())
    this.initForm();
  }

  initForm(){
    let address = '';
    let driver = new FormGroup({
      'Id': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required)
    });

    let count = 0;

    this.deliveryForm = new FormGroup({
      'Address': new FormControl(address, Validators.required),
      'Driver': driver,
      'DeliveryDate': new FormControl(this.deliveryDate, Validators.required)
    });    
  }

  onDriverSelect(selectedDriver: INameId){
    let driver = <FormGroup>this.deliveryForm.get('Driver');
      driver.setControl('Id', new FormControl(selectedDriver.Id, Validators.required));
      driver.setControl('Name', new FormControl(selectedDriver.Name, Validators.required));
  }

  onDateChanged(dateModel: IMyDateModel){
    let date = new Date(dateModel.date.year, dateModel.date.month, dateModel.date.day);
    this.deliveryForm.setControl('DeliveryDate', new FormControl(date, Validators.required));
  }

  addProductToDelivery(product: ProductModel){
    this.deliveryProducts.push(product);
  }

  deleteProductFromDelivery(index: number){
    this.deliveryProducts.splice(index, 1);
  }

  clearDeliveryProducts(){
    this.deliveryProducts = [];
  }

  addDelivery(){
    
  }
}
