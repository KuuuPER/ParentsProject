import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromPurchases from '../../purchases/store/reducers/purchases.reducers';
import * as fromReducers from '../store/reducers';
import * as fromReturnSelectors from '../store/reducers/return-purchases.selectors';
import * as ReturnPurchaseActions from '../store/return-purchases.actions';
import { ReturnPurchaseModel } from '../src/ReturnPurchaseModel';
import { ReturnReason, ReturnReasonHelper } from '../src/ReturnReason';
import { INameId } from '../../src/INameId';
import { IMyOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker/interfaces';
import { PurchaseModel } from '../../purchases/src/PurchaseModel';

@Component({
  selector: 'app-return-purchases-list',
  templateUrl: './return-purchases-list.component.html',
  styleUrls: ['./return-purchases-list.component.css']
})
export class ReturnPurchasesListComponent implements OnInit {
  public returnPurchasesState: Observable<ReturnPurchaseModel[]>;
  public purchasesState: Observable<PurchaseModel[]>;

  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  public editedReturnPurchase: ReturnPurchaseModel = null;

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
    this.returnPurchasesState = this.store.select(fromReturnSelectors.getAllReturnPurchases);
    this.purchasesState = this.store.select(fromReturnSelectors.getAllPurchases);
    //this.store.dispatch(new ReturnPurchaseActions.FetchDeliveries())
  }

  editReturnPurchase(returnPurchase: ReturnPurchaseModel){
    this.editedReturnPurchase = new ReturnPurchaseModel(returnPurchase.id, returnPurchase.purchase, returnPurchase.units, returnPurchase.comment, returnPurchase.date, returnPurchase.reason);
  }

  deleteReturnPurchase(id: string){
    this.store.dispatch(new ReturnPurchaseActions.DeleteReturnPurchase(id));
  }

  saveReturnPurchase(id: string){
    this.store.dispatch(new ReturnPurchaseActions.EditReturnPurchase({ id: id, returnPurchase: this.editedReturnPurchase }));
    this.editedReturnPurchase = null;
  }

  onPurchaseSelect(selectedPurchase: INameId){
    this.editedReturnPurchase.purchase = selectedPurchase;
  }

  getReasonStr(returnPurchase: ReturnPurchaseModel){
    return ReturnReasonHelper.getReturnReasonText(<ReturnReason>returnPurchase.reason);
  }

  getReasonsNameId(): INameId[]{
    return ReturnReasonHelper.getReasonsNameId();
  }

  onDateChanged(event: IMyDateModel){
    this.editedReturnPurchase.date = new Date (event.date.year, event.date.month, event.date.day);
  }

  onReasonSelect(reason: INameId){
    this.editedReturnPurchase.reason = ReturnReasonHelper.getReturnReasonFromText(reason.name);
  }

  cancel(){
    this.editedReturnPurchase = null;
  }

  loadTemplate(returnPurchase: ReturnPurchaseModel){
    if(!returnPurchase)
      return null;
    
    if (this.editedReturnPurchase && this.editedReturnPurchase.id == returnPurchase.id) {
      return this.editTemplate;
    }
    else{
      return this.readOnlyTemplate;
    }
  }
}