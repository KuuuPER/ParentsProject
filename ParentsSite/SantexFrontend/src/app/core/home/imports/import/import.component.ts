import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromDeliveries from '../store/imports.reducers';
import * as ImportActions from '../store/imports.actions';
import * as fromProducts from '../../products/store/products.reducers';
import { ImportModel } from '../src/ImportModel';
import { ImportStatus } from '../src/ImportStatus'
import { INameId } from '../../src/INameId';
import { ProductModel } from '../../products/src/ProductModel';
import { IMyOptions, IMyDateModel } from 'angular4-datepicker/src/my-date-picker/interfaces';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  importsState: Observable<fromDeliveries.State>;
  productsState: Observable<fromProducts.State>;
  importForm: FormGroup;
  
  importProducts: ProductModel[] = new Array<ProductModel>();
  
  public importDate = new Date();

  public myDatePickerOptions: IMyOptions = {
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
    this.importsState = this.store.select('imports');
    this.productsState = this.store.select('products');
    //this.store.dispatch(new ImportActions.FetchDeliveries())
    this.initForm();
  }

  initForm(){
    let address = '';
    let provider = new FormGroup({
      'Id': new FormControl('', Validators.required),
      'Name': new FormControl('', Validators.required)
    });

    let count = 0;

    this.importForm = new FormGroup({
      'provider': provider,
      'importDate': new FormControl(this.importDate, Validators.required),
      'createdDate': new FormControl(this.importDate, Validators.required),
      'finishDate': new FormControl(this.importDate),
    });    
  }

  onProviderSelect(selectedProvider: INameId){
    let provider = <FormGroup>this.importForm.get('Provider');
      provider.setControl('Id', new FormControl(selectedProvider.Id, Validators.required));
      provider.setControl('Name', new FormControl(selectedProvider.Name, Validators.required));
  }

  onCreatedDateChanged(dateModel: IMyDateModel){
    this.setControlDate('createdDate', dateModel);
  }

  onImportDateChanged(dateModel: IMyDateModel){
    this.setControlDate('importDate', dateModel);
  }

  onFinishDateChanged(dateModel: IMyDateModel){
    this.setControlDate('finishDate', dateModel);
  }

  setControlDate(controlName:string, dateModel: IMyDateModel){
    let date = new Date(dateModel.date.year, dateModel.date.month, dateModel.date.day);
    this.importForm.setControl(controlName, new FormControl(date, Validators.required));
  }

  addProductToImport(product: ProductModel){
    this.importProducts.push(product);
  }

  deleteProductFromImport(index: number){
    this.importProducts.splice(index, 1);
  }

  clearImportProducts(){
    this.importProducts = [];
  }

  addImport(){
    
  }
}
