import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromReducers from '../store/reducers';
import * as fromDeliveries from '../store/reducers/deliveries.reducers';
import * as fromSelectors from '../store/reducers/deliveries.selectors'
import * as DeliveriesActions from '../store/deliveries.actions';
import * as DriversActions from '../../drivers/store/drivers.actions';
import { DeliveryModel } from '../src/DeliveryModel';
import { DeliveryStatus } from '../src/DeliveryStatus';
import { INameId } from '../../src/INameId';
import { ProductModel } from '../../products/src/ProductModel';
import { IMyOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker/interfaces';
import { DriverModel } from '../../drivers/src/DriverModel';
import { DeliveryPurchaseModel } from '../src/DeliveryPurchaseModel';
import { SidePanelContainerComponent } from '../../shared/side-panel-container/side-panel-container.component';
import { PurchaseComponent } from '../purchase/purchase.component';
import { PurchaseUnitModel } from '../../src/PurchaseUnit';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  public purchases: Observable<DeliveryPurchaseModel[]>;
  public editDelivery: Observable<DeliveryModel>;
  public productsState: Observable<ProductModel[]>;
  public drivers: Observable<DriverModel[]>;
  public deliveryForm: FormGroup;
  public controlName: string = 'driver';

  public deliveryUnits: Observable<PurchaseUnitModel[]>;
  
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
    private store: Store<fromReducers.FeatureState>,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.purchases = this.store.select(fromSelectors.getPurchases);
    this.editDelivery = this.store.select(fromSelectors.getEditDelivery);
    this.productsState = this.store.select(fromSelectors.getAllProducts);
    this.drivers = this.store.select(fromSelectors.getAllDrivers);
    this.deliveryUnits = this.store.select(fromSelectors.getDeliveryUnits);

    this.store.dispatch(new DriversActions.FetchDrivers());
    this.store.dispatch(new DeliveriesActions.GetPurchases());
    this.route.params.subscribe((params: Params) => {
      if (params['id'] !== undefined) {
        this.id = params['id'];
        this.editMode = params['id'];
        this.initEditForm();
      }
      else{
        this.editMode = false;        
        this.initForm();
      }
    });    
  }

  initEditForm(){
    this.store.dispatch(new DeliveriesActions.GetDelivery(this.id));
        this.editDelivery.skip(1).take(1)
        .subscribe(d => {
          this.initForm(<DeliveryModel>d);
        });
        // this.importProductsPageInfo.take(1).subscribe((pageInfo) => {
        //   this.store.dispatch(new DeliveriesActions.FetchImportProducts({pageInfo: pageInfo, importId: this.id}));
        // });
  }

  initForm(editDelivery: DeliveryModel = null){
    let driver: INameId = {name: '', id: ''};
    let deliveryDate = new Date();
    
    if (editDelivery) {
      driver = editDelivery.driver;
      deliveryDate = editDelivery.deliveryDate;      
    }

    this.deliveryForm = new FormGroup({
      'date': new FormControl({
        date:{
          year: deliveryDate.getFullYear(),
          month: deliveryDate.getMonth() + 1,
          day: deliveryDate.getDate()
        }
      }, Validators.required),
      'delivery': new FormGroup({
        'deliveryDate': new FormControl(deliveryDate, Validators.required),
        'driver': new FormGroup({
          'name': new FormControl(driver.name, Validators.required),
          'id': new FormControl(driver.id, Validators.required),
        })
      })
      });
  }

  onDriverSelect(selectedDriver: INameId){
    let driver = <FormGroup>this.deliveryForm.get('driver');
      driver.setControl('id', new FormControl(selectedDriver.id, Validators.required));      
  }

  onDateChanged(dateModel: IMyDateModel){
    let date = new Date(dateModel.date.year, dateModel.date.month - 1, dateModel.date.day);    
    (<FormControl>this.deliveryForm.get('delivery.deliveryDate')).setValue(date);
  }

  deleteProductFromDelivery(deliveryUnitId: string){
    this.store.dispatch(new DeliveriesActions.DeletePurchaseUnit({purchaseUnitId: deliveryUnitId}));
  }

  clearDeliveryProducts(){
    this.store.dispatch(new DeliveriesActions.ClearPurchaseUnits());
  }

  @ViewChild(SidePanelContainerComponent)
  public sidePanelComponent: SidePanelContainerComponent;
  
  sidePanelOpen(){
    this.sidePanelComponent.container.clear();

    this.sidePanelComponent.headTitle = 'Товары к доставке';
    const factory = this.resolver.resolveComponentFactory(PurchaseComponent);    
    let compRef = this.sidePanelComponent.container.createComponent(factory);    
    compRef.instance.purchases = this.purchases;
    compRef.instance.deliveryUnits = this.deliveryUnits;

    this.sidePanelComponent.show = true;
  }

  addDelivery(){
    let delivery = <DeliveryModel>this.deliveryForm.get('delivery').value;
    if (this.editMode) {      
      delivery.id = this.id;
      this.store.dispatch(new DeliveriesActions.EditDelivery({delivery: delivery, id: this.id}));
    }
    else{
      this.store.dispatch(new DeliveriesActions.AddDelivery(delivery));
    }

    this.router.navigate(['../../'], {relativeTo: this.route});
  }
}
