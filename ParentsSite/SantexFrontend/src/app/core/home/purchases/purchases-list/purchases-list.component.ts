import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { Store } from '@ngrx/store';

import { PurchaseModel } from '../src/PurchaseModel';
import * as fromPurchases from '../store/purchases.reducers';
import * as PurchasesActions from '../store/purchases.actions';
import { Observable } from 'rxjs/Observable';
import { IMyOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker/interfaces';

@Component({
  selector: 'app-purchases-list',
  templateUrl: './purchases-list.component.html',
  styleUrls: ['./purchases-list.component.css']
})
export class PurchasesListComponent implements OnInit {
  purchasesState: Observable<fromPurchases.State>;

  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  public datePickerOptions: IMyOptions = {
      dateFormat: 'dd.mm.yyyy',
      
      height: '34px',
      width: '210px',
      inline: false
  };

  public editedPurchase: PurchaseModel;

  constructor(private store: Store<fromPurchases.FeatureState>) { }

  ngOnInit() {
    this.purchasesState = this.store.select('purchases');
  }

  editPurchase(purchase: PurchaseModel){
    this.editedPurchase = new PurchaseModel(purchase.id, purchase.contact, purchase.date, purchase.products, purchase.delivery);
  }

  deletePurchase(index: number){
    this.store.dispatch(new PurchasesActions.DeletePurchase(index));
  }

  onDateChanged(dateModel: IMyDateModel){
    this.editedPurchase.date = new Date(dateModel.date.year, dateModel.date.month, dateModel.date.day);
  }

  savePurchase(index: number){
    this.store.dispatch(new PurchasesActions.EditPurchase({ index: index, purchase: this.editedPurchase }));
    this.editedPurchase = null;
  }

  cancel(){
    this.editedPurchase = null;
  }

  loadTemplate(purchase: PurchaseModel){
    if (this.editedPurchase && this.editedPurchase.id == purchase.id) {
      return this.editTemplate;
    }
    else{
      return this.readOnlyTemplate;
    }
  }
}
