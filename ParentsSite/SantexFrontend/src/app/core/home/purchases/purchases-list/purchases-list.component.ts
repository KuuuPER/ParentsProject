import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { Store } from '@ngrx/store';

import { PurchaseModel } from '../src/PurchaseModel';
import * as fromPurchases from '../store/reducers/purchases.reducers';
import * as fromSelectors from '../store/reducers/purchases.selectors';
import * as fromReducers from '../store/reducers';
import * as PurchasesActions from '../store/purchases.actions';
import { Observable } from 'rxjs/Observable';
import { IMyOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker/interfaces';
import { PageInfo } from '../../src/PageInfo';

@Component({
  selector: 'app-purchases-list',
  templateUrl: './purchases-list.component.html',
  styleUrls: ['./purchases-list.component.css']
})
export class PurchasesListComponent implements OnInit {
  public purchasesState: Observable<PurchaseModel[]>;
  public pageInfo: Observable<PageInfo>;

  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  public datePickerOptions: IMyOptions = {
      dateFormat: 'dd.mm.yyyy',
      
      height: '34px',
      width: '210px',
      inline: false
  };

  public editedPurchase: PurchaseModel;

  constructor(private store: Store<fromReducers.FeatureState>) { }

  ngOnInit() {
    this.purchasesState = this.store.select(fromSelectors.getAllPurchases);
    this.pageInfo = this.store.select(fromSelectors.getPageInfo);
  }

  editPurchase(purchase: PurchaseModel){
    this.editedPurchase = new PurchaseModel(purchase.id, purchase.contact, purchase.date, purchase.units, purchase.delivery);
  }

  deletePurchase(id: string){
    this.store.dispatch(new PurchasesActions.DeletePurchase(id));
  }

  onDateChanged(dateModel: IMyDateModel){
    this.editedPurchase.date = new Date(dateModel.date.year, dateModel.date.month, dateModel.date.day);
  }

  savePurchase(id: string){
    this.store.dispatch(new PurchasesActions.EditPurchase({ id: id, purchase: this.editedPurchase }));
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
