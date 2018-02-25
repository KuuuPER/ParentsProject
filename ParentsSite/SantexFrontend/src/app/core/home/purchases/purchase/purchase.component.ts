import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { IMyOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker/interfaces';

import * as fromPurchases from '../store/purchases.reducers';
import { PurchaseModel } from '../src/PurchaseModel';
import { ContactModel } from '../src/ContactModel';
import * as fromProducts from '../../products/store/products.reducers';
import { ProductModel } from '../../products/src/ProductModel';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  purchasesState: Observable<fromPurchases.State>;
  productsState: Observable<fromProducts.State>;
  purchaseForm: FormGroup;
  driverControlName: 'Driver';

  purchaseProducts: ProductModel[] = new Array<ProductModel>();
  
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
    private store: Store<fromPurchases.FeatureState>
  ) { }

  ngOnInit() {
    this.purchasesState = this.store.select('purchases');
    this.productsState = this.store.select('products');
    //this.store.dispatch(new PurchaseActions.FetchDeliveries())
    this.initForm();
  }

  initForm(){
    let address = '';
    let contact = new ContactModel('', '', '');

    this.purchaseForm = new FormGroup({
      'Address': new FormControl(address, Validators.required),
      'PurchaseDate': new FormControl(this.purchaseDate, Validators.required),
      'Contact': new FormGroup({
        'ContactName': new FormControl(contact.name),
        'ContactPhone': new FormControl(contact.phone),
        'ContactAddress': new FormControl(contact.address),
      })
    });    
  }

  addProductToPurchase(product: ProductModel){
    this.purchaseProducts.push(product);
  }

  deleteProductFromPurchase(index: number){
    this.purchaseProducts.splice(index, 1);
  }

  onDateChanged(dateModel: IMyDateModel){
    let date = new Date(dateModel.date.year, dateModel.date.month, dateModel.date.day);
    this.purchaseForm.setControl('PurchaseDate', new FormControl(date, Validators.required));
  }

  clearPurchaseProducts(){
    this.purchaseProducts = [];
  }

  addPurchase(){
    
  }
}
