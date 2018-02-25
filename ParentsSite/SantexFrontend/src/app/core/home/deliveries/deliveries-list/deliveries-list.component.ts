import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromDeliveries from '../store/deliveries.reducers';
import * as DeliveryActions from '../store/deliveries.actions';
import { DeliveryModel, DeliveryStatus } from '../src/DeliveryModel';
import { INameId } from '../../src/INameId';
import { IMyOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker/interfaces';

@Component({
  selector: 'app-deliveries-list',
  templateUrl: './deliveries-list.component.html',
  styleUrls: ['./deliveries-list.component.css']
})
export class DeliveriesListComponent implements OnInit {
  deliveriesState: Observable<fromDeliveries.State>;

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
    private store: Store<fromDeliveries.FeatureState>
  ) { }

  ngOnInit() {
    this.deliveriesState = this.store.select('deliveries');
    //this.store.dispatch(new DeliveryActions.FetchDeliveries())
  }

  editDelivery(delivery: DeliveryModel){
    this.editedDelivery = new DeliveryModel(delivery.Id, delivery.Address, delivery.ProductsCount, delivery.deliveryDate, delivery.Driver);
    this.editedDelivery.Status = delivery.Status;
  }

  deleteDelivery(index: number){
    this.store.dispatch(new DeliveryActions.DeleteDelivery(index));
  }

  saveDelivery(index: number){
    this.store.dispatch(new DeliveryActions.EditDelivery({ index: index, delivery: this.editedDelivery }));
    this.editedDelivery = null;
  }

  onDriverSelect(selectedDriver: INameId){
    this.editedDelivery.Driver = selectedDriver;
  }

  onDateChanged(event: IMyDateModel){
    this.editedDelivery.deliveryDate = new Date (event.date.year, event.date.month, event.date.day);
  }

  cancel(){
    this.editedDelivery = null;
  }

  loadTemplate(delivery: DeliveryModel){
    if (this.editedDelivery && this.editedDelivery.Id == delivery.Id) {
      return this.editTemplate;
    }
    else{
      return this.readOnlyTemplate;
    }
  }

}
