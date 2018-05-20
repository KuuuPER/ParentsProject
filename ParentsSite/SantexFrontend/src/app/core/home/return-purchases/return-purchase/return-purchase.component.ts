import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Store, createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';
import { IMyOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker/interfaces';

import * as fromPurchases from '../../purchases/store/reducers/purchases.reducers';
import * as fromReturnSelectors from '../store/reducers/return-purchases.selectors';
import * as fromReducers from '../store/reducers';
import { ProductModel } from '../../products/src/ProductModel';
import { PurchaseUnitModel } from '../../src/PurchaseUnit';
import { ReturnPurchaseUnitModel } from '../src/ReturnPurchaseUnitModel';
import { PurchaseModel } from '../../purchases/src/PurchaseModel';
import { INameId } from '../../src/INameId';
import { ReturnPurchaseModel } from '../src/ReturnPurchaseModel';

@Component({
  selector: 'app-return-purchase',
  templateUrl: './return-purchase.component.html',
  styleUrls: ['./return-purchase.component.css']
})
export class ReturnPurchaseComponent implements OnInit {
  public purchases: Observable<PurchaseModel[]>;
  public products: Observable<ProductModel[]>;
  public returnPurchases: Observable<ReturnPurchaseModel[]>;
  public returnPurchaseForm: FormGroup;  

  public returnPurchaseUnits: ReturnPurchaseUnitModel[] = new Array<ReturnPurchaseUnitModel>();
  public purchase: PurchaseModel;

  public returnPurchaseDate = new Date();

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
    this.purchases = this.store.select(fromReturnSelectors.getAllPurchases);
    this.returnPurchases = this.store.select(fromReturnSelectors.getAllReturnPurchases);
    //this.productsState = this.store.select('products');
    //this.store.dispatch(new PurchaseActions.FetchDeliveries())
    this.initForm();
  }

  initForm(){
    let address = '';
    
    this.returnPurchaseForm = new FormGroup({
      'date': new FormControl(this.returnPurchaseDate, Validators.required),
      'comment': new FormControl(''),
      'purchase': new FormGroup({
        'name': new FormControl('', Validators.required)
      })
    });
  }

  addProductToReturnPurchase(unit: PurchaseUnitModel){
    // if (this.returnPurchaseUnits.some(u => u.product.id === product.id)) {
    //   let p = this.returnPurchaseUnits.find(u => u.product.id === product.id);
    //   p.count++;
    // }
    // else{
    //   let purchaseUnit = new PurchaseUnitModel(this.purchase, {id: product.id, name: product.name}, 1, product.storePrice, new Date(), new Date(), PurchaseUnitStatus.Returned);
    //   this.returnPurchaseUnits.push(purchaseUnit);
    // }
    unit.status = 'Возвращено';
    if (this.returnPurchaseUnits.some(r => r.product.id === unit.product.id)) {
      let purchaseUnit = this.returnPurchaseUnits.find(r => r.product.id === unit.product.id);
      purchaseUnit.count++;
    }
    else{
      this.returnPurchaseUnits.push(new ReturnPurchaseUnitModel(null, unit.product, 1));
    }
  }

  deleteProductFromPurchase(index: number){
    let productId = this.returnPurchaseUnits[index].product.id;
    let unit = this.purchase.purchaseUnits.find(p => p.product.id === productId);
    
    this.returnPurchaseUnits.splice(index, 1);
  }

    onDateChanged(dateModel: IMyDateModel){
    let date = new Date(dateModel.date.year, dateModel.date.month, dateModel.date.day);
    this.returnPurchaseForm.setControl('date', new FormControl(date, Validators.required));
  }

    clearPurchaseProducts(){
    this.returnPurchaseUnits = [];
  }

  addReturnPurchase(){
    
  }
}
