import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromReducers from '../store/reducers';
import * as fromDeliveries from '../store/reducers/deliveries.reducers';
import * as fromSelectors from '../store/reducers/deliveries.selectors'
import * as DeliveryActions from '../store/deliveries.actions';
import { DeliveryModel, DeliveryStatus } from '../src/DeliveryModel';
import { INameId } from '../../src/INameId';
import { ProductModel } from '../../products/src/ProductModel';
import { IMyOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker/interfaces';
import { DriverModel } from '../../drivers/src/DriverModel';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  public deliveriesState: Observable<DeliveryModel[]>;
  public productsState: Observable<ProductModel[]>;
  public drivers: Observable<DriverModel[]>;
  public deliveryForm: FormGroup;
  public driverControlName: 'Driver';

  public deliveryProducts: ProductModel[] = new Array<ProductModel>();
  
  public deliveryDate = new Date();

  public editMode = false;
  public id: string;

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
    this.route.params.subscribe((params: Params) => {
      if (params['id'] !== undefined) {
        this.id = params['id'];
        this.editMode = params['id'];
      }
      else{
        this.editMode = false;
      }
    });

    this.deliveriesState = this.store.select(fromSelectors.getAllDeliveries);
    this.productsState = this.store.select(fromSelectors.getAllProducts);
    this.drivers = this.store.select(fromSelectors.getAllDrivers);
    //this.store.dispatch(new DeliveryActions.FetchDeliveries())
    this.initForm();
  }

  initForm(){
    let address = '';
    let driver: INameId = {name: '', id: ''}; 
    let date = new Date();
    let count = 0;

    if (this.editMode) {
      const delivery = this.store.select(fromSelectors.getDeliveriesState)
      .take(1)
      .subscribe((state: fromDeliveries.State) => {
          const delivery = state.deliveries[this.id];

          address = delivery.address;
          driver = delivery.driver;
          count= delivery.productsCount;
          date = delivery.date
      });      
    }

    this.deliveryForm = new FormGroup({
      'address': new FormControl(address, Validators.required),
      'driver': new FormGroup({
        'id': new FormControl(driver.id, Validators.required),
        'name': new FormControl(driver.name, Validators.required)
      }),
      'date': new FormControl(date, Validators.required)
    });    
  }

  onDriverSelect(selectedDriver: INameId){
    let driver = <FormGroup>this.deliveryForm.get('driver');
      driver.setControl('id', new FormControl(selectedDriver.id, Validators.required));
      driver.setControl('name', new FormControl(selectedDriver.name, Validators.required));
  }

  onDateChanged(dateModel: IMyDateModel){
    let date = new Date(dateModel.date.year, dateModel.date.month, dateModel.date.day);
    this.deliveryForm.setControl('date', new FormControl(date, Validators.required));
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
    if (this.editMode) {
      debugger;
      let delivery = <DeliveryModel>this.deliveryForm.value;
      delivery.id = this.id;
      this.store.dispatch(new DeliveryActions.EditDelivery({delivery: delivery, id: this.id}));
    }

    this.router.navigate(['../../'], {relativeTo: this.route});
  }
}
