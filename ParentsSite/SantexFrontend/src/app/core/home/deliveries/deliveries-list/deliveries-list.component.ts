import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromReducers from '../store/reducers';
import * as fromDeliveries from '../store/reducers/deliveries.reducers';
import * as fromSelectors from '../store/reducers/deliveries.selectors';
import * as Actions from '../store/deliveries.actions';
import * as DriversActions from '../../drivers/store/drivers.actions';
import { DeliveryModel } from '../src/DeliveryModel';
import { DeliveryStatus } from '../src/DeliveryStatus';
import { INameId } from '../../src/INameId';
import { IMyOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker/interfaces';
import { DriverModel } from '../../drivers/src/DriverModel';
import { PageInfo } from '../../src/PageInfo';

@Component({
  selector: 'app-deliveries-list',
  templateUrl: './deliveries-list.component.html',
  styleUrls: ['./deliveries-list.component.css']
})
export class DeliveriesListComponent implements OnInit {
  public deliveries: Observable<DeliveryModel[]>;
  public pageInfo: Observable<PageInfo>;
  public drivers: Observable<DriverModel[]>;
  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  public editedDelivery: DeliveryModel = null;

  public datePickerOptions: IMyOptions = {
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
    this.deliveries = this.store.select(fromSelectors.getAllDeliveries);
    this.pageInfo = this.store.select(fromSelectors.getPageInfo);
    this.drivers = this.store.select(fromSelectors.getAllDrivers);
    
    this.store.dispatch(new DriversActions.FetchDrivers());
    this.fetchFirstPage();
  }

  public fetchFirstPage(){
    this.pageInfo
     .take(1)
     .subscribe((p) => {
     this.store.dispatch(new Actions.FetchDeliveries(p));
     });
 }

  editDelivery(delivery: DeliveryModel){
    this.editedDelivery = new DeliveryModel(delivery.id, delivery.deliveryDate, delivery.driver, delivery.purchases, delivery.DeliveryStatus, delivery.finishDate);    
  }

  deleteDelivery(id: string){
    this.store.dispatch(new Actions.DeleteDelivery(id));
  }

  saveDelivery(id: string){
    this.store.dispatch(new Actions.EditDelivery({ id: id, delivery: this.editedDelivery }));
    this.editedDelivery = null;
  }

  onDriverSelect(selectedDriver: INameId){
    this.editedDelivery.driver = selectedDriver;
  }

  onDateChanged(event: IMyDateModel){
    this.editedDelivery.deliveryDate = new Date (event.date.year, event.date.month, event.date.day);
  }

  onPageClicked(pageInfo: PageInfo){
    this.store.dispatch(new Actions.FetchDeliveries(pageInfo));
    this.store.dispatch(new Actions.ChangePage(pageInfo.currentPage));
  }

  cancel(){
    this.editedDelivery = null;
  }

  loadTemplate(delivery: DeliveryModel){
    if (this.editedDelivery && this.editedDelivery.id == delivery.id) {
      return this.editTemplate;
    }
    else{
      return this.readOnlyTemplate;
    }
  }

}
