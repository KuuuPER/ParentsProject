import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromProvider from '../store/reducers/providers.reducers';
import * as fromSelectors from '../store/reducers/providers.selectors';
import * as Actions from '../store/providers.actions';
import { ProviderModel } from '../src/ProviderModel';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {
  providerForm: FormGroup;
  
  providers: Observable<ProviderModel[]>;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromProvider.FeatureState>) { }

  ngOnInit() {
    this.providers = this.store.select(fromSelectors.getAllProviders);

    this.initForm();
  }

  initForm(){
    let providerName = '';

    this.providerForm = new FormGroup({
      'Name': new FormControl(providerName, Validators.required)
    });
  }

  addProvider(){
    let newProvider = <ProviderModel>this.providerForm.value;
    this.store.dispatch(new Actions.AddProvider(newProvider))
    this.onCancel();
  }
  
  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
