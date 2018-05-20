import { Component, OnInit, Input, ChangeDetectorRef, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ContactModel } from '../src/ContactModel';
import { PurchaseDeliveryModel } from '../src/PurchaseDeliveryModel';
import { Observable } from 'rxjs/Observable';
import { DatePickerParams } from '../../shared/datePickerParameters';
import { IMyDateModel } from 'angular4-datepicker/src/my-date-picker/interfaces';

@Component({
  selector: 'purchase-delivery',
  templateUrl: './purchase-delivery.component.html',
  styleUrls: ['./purchase-delivery.component.css'],  
})
export class PurchaseDeliveryComponent implements OnInit {
  public formGroup: FormGroup;

  public deliveries: Observable<PurchaseDeliveryModel[]>;

  public dpOptions = DatePickerParams.datePickerOptions;
  public selectedDate = DatePickerParams.selectedDate;
  
  constructor() { }

  ngOnInit() {
    let deliveries = <FormArray>this.formGroup.get('deliveries');

    if (deliveries && deliveries.length > 0) {
      return;
    }

    this.deliveries.take(1)
    .subscribe(deliveries => {
      if (deliveries.length === 0) {
        deliveries = [new PurchaseDeliveryModel([], new Date(), '', 12, 18, {id: '', name: ''}, [])];
      }
  
      let formDeliveries = new FormArray([]);
  
      deliveries.forEach((d, i) => {
        formDeliveries.push(this.createFormGroupFromPurchaseDelivery(d));
      });
      this.formGroup.setControl('deliveries', formDeliveries);
    });    
  }

  createFormGroupFromPurchaseDelivery(pDelivery: PurchaseDeliveryModel = null){
    if (pDelivery === null) {
      pDelivery = new PurchaseDeliveryModel([], new Date(), '', 12, 18, {id: '', name: ''}, []);
    }

    let contacts = pDelivery.contacts.length > 0 ?
        new FormArray(pDelivery.contacts.map(c => this.initContacts(c))) :
        new FormArray([this.initContacts(new ContactModel(null, '', ''))]);

    return new FormGroup(
      {
        'deliveryDate': new FormControl({date: DatePickerParams.selectedDate(pDelivery.date)}),
        'date': new FormControl(pDelivery.date),
        'timeFrom': new FormControl(pDelivery.timeFrom),
        'timeTo': new FormControl(pDelivery.timeTo),
        'address': new FormControl(pDelivery.address, Validators.required),
        'contacts': contacts
      }
    )
  }

  getDeliveriesFormArray(): FormArray{
    let deliveries = <FormArray>this.formGroup.get('deliveries');
    return deliveries;
  }

  getContactsFromDelivery(delivery: FormGroup){    
    return <FormArray>delivery.get('contacts');
  }

  initContacts(contact: ContactModel){
    return new FormGroup({
      'name': new FormControl(contact.name, Validators.required),
      'phone': new FormControl(contact.phone, [Validators.pattern(/\+7[\d]{10}/), Validators.required])
    });
  }

  addContact(formGroup: FormGroup){
    const control = <FormArray>(formGroup.get('contacts'));
    control.push(this.initContacts(new ContactModel('', '', '')));
  }

  removeContact(formGroup: FormGroup, contactIndex: number) {    
      const control = <FormArray>(formGroup.get('contacts'));
      control.removeAt(contactIndex);
  }

  onDateChanged(date: IMyDateModel, form: FormGroup){
    let parsedDate = DatePickerParams.getDate(date);
    form.get('date').setValue(parsedDate);
  }

  addDelivery(){
    let deliveries = <FormArray>this.formGroup.get('deliveries');
    deliveries.push(this.createFormGroupFromPurchaseDelivery())
  }

  removeDelivery(index: number){
    let deliveries = <FormArray>this.formGroup.get('deliveries');
    deliveries.removeAt(index);
  }
}
