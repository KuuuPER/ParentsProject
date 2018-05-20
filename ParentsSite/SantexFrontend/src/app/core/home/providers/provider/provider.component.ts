import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromProvider from '../store/reducers/providers.reducers';
import * as fromSelectors from '../store/reducers/providers.selectors';
import * as Actions from '../store/providers.actions';
import { ProviderModel } from '../src/ProviderModel';
import { ContactModel } from '../../purchases/src/ContactModel';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {
  public editProvider: Observable<ProviderModel>;
  public providerForm: FormGroup;
  
  public providers: Observable<ProviderModel[]>;

  public id: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromProvider.FeatureState>) { }

  ngOnInit() {
    this.providers = this.store.select(fromSelectors.getAllProviders);
    this.editProvider = this.store.select(fromSelectors.getEditProvider);

    this.route.params.subscribe((params: Params) => {
      if (params['id'] !== undefined) {
        this.id = params['id'];
        
        this.store.dispatch(new Actions.GetProvider(this.id));
        this.editProvider.skip(1)
        .take(1)
        .subscribe(c => {
          this.initForm(<ProviderModel>c);
        });
      }
      else{
        this.initForm();
      }
    });    
  }

  initForm(provider: ProviderModel = null){
    if(provider == null){
      provider = new ProviderModel('', '', [],[]);
    }

    let contactsFormArray = provider.contacts.length > 0 ?
      new FormArray(provider.contacts.map(c => this.initContacts(c)))
      : new FormArray([this.initContacts(new ContactModel('', '', ''))]);

    this.providerForm = new FormGroup({
      'name': new FormControl(provider.name, Validators.required),
      'contacts': contactsFormArray
    });
  }

  initContacts(contact: ContactModel){
    return new FormGroup({
      'id': new FormControl(contact.id, Validators.required),
      'name': new FormControl(contact.name, Validators.required),
      'phone': new FormControl(contact.phone, [Validators.pattern(/\+7[\d]{10}/), Validators.required])
    });
  }

  getContactsFromProviderForm(): FormArray{
    return <FormArray>this.providerForm.get('contacts');
  }

  addContact(){
    const control = <FormArray>this.providerForm.controls['contacts'];
    control.push(this.initContacts(new ContactModel('', '', '')));
  }

  removeContact(i: number) {    
      const control = <FormArray>this.providerForm.controls['contacts'];
      control.removeAt(i);
  }

  addProvider(){
    let newProvider = <ProviderModel>this.providerForm.value;
    if (this.id) {
      newProvider.id = this.id;
      this.store.dispatch(new Actions.EditProvider({id: this.id, provider: newProvider }));
    }
    else{
      this.store.dispatch(new Actions.AddProvider(newProvider))
    }
  }
  
  onCancel(){
    this.router.navigate(['home/providers']);
  }
}
