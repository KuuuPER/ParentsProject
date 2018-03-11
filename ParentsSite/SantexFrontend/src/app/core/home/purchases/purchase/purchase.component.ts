import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { IMyOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker/interfaces';

import * as fromPurchases from '../store/reducers/purchases.reducers';
import * as fromSelectors from '../store/reducers/purchases.selectors';
import { PurchaseModel } from '../src/PurchaseModel';
import { ContactModel } from '../src/ContactModel';
import * as fromProducts from '../../products/store/reducers/products.reducers';
import { ProductModel } from '../../products/src/ProductModel';
import { PurchaseUnitModel } from '../../src/PurchaseUnit';
import * as fromReducers from '../store/reducers';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  purchasesState: Observable<PurchaseModel[]>;
  productsState: Observable<ProductModel[]>;
  purchaseForm: FormGroup;

  purchaseUnits: PurchaseUnitModel[] = new Array<PurchaseUnitModel>();
  
  public purchaseDate = new Date();

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
    this.purchasesState = this.store.select(fromSelectors.getAllPurchases);
    this.productsState = this.store.select(fromSelectors.getAllProducts);
    //this.store.dispatch(new PurchaseActions.FetchDeliveries())
    this.initForm();
  }

  initForm(){
    let address = '';
    let contact = new ContactModel('', '', '', '');

    this.purchaseForm = new FormGroup({
      'date': new FormControl(this.purchaseDate, Validators.required),
      'contact': new FormGroup({
        'name': new FormControl(contact.name),
        'phone': new FormControl(contact.phone),
        'address': new FormControl(contact.address),
      })
    });
  }

  addProductToPurchase(product: ProductModel){
    product.count--;

    if (this.purchaseUnits.some(u => u.product.id === product.id)) {
      let p = this.purchaseUnits.find(u => u.product.id === product.id);
      p.count++;
    }
    else{
      let purchaseUnit = new PurchaseUnitModel(null, null, {id: product.id, name: product.name}, 1, product.storePrice, new Date(), new Date());
      this.purchaseUnits.push(purchaseUnit);
    }
  }

  deleteProductFromPurchase(index: number){
    let productId = this.purchaseUnits[index].product.id;
    this.productsState.forEach(s => {
      let p = s.find(i => i.id === productId);
      p.count += this.purchaseUnits[index].count
    });

    this.purchaseUnits.splice(index, 1);
  }

  onDateChanged(dateModel: IMyDateModel){
    let date = new Date(dateModel.date.year, dateModel.date.month, dateModel.date.day);
    this.purchaseForm.setControl('date', new FormControl(date, Validators.required));
  }

  clearPurchaseProducts(){
    this.purchaseUnits = [];
  }

  addPurchase(){
    
  }
}
