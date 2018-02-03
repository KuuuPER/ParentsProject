import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as Actions from '../store/providers.actions';
import * as fromProviders from '../store/providers.reducers';
import { ProviderModel } from '../src/ProviderModel';

@Component({
  selector: 'app-providers-list',
  templateUrl: './providers-list.component.html',
  styleUrls: ['./providers-list.component.css']
})
export class ProvidersListComponent implements OnInit {
  providersState: Observable<fromProviders.State>;
  editedProvider: ProviderModel;

  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromProviders.FeatureState>
  ) { }

  ngOnInit() {
    this.providersState = this.store.select('providers');
  }

  editProvider(provider: ProviderModel){
    this.editedProvider = new ProviderModel(provider.Name, provider.Id);
  }

  deleteProvider(index: number){
    this.store.dispatch(new Actions.DeleteProvider(index));
  }

  saveProvider(index: number){
    this.store.dispatch(new Actions.EditProvider({ index: index, provider: this.editedProvider }));
    this.editedProvider = null;
  }

  cancel(){
    this.editedProvider = null;
  }

  loadTemplate(provider: ProviderModel){
    if (this.editedProvider && this.editedProvider.Id == provider.Id) {
      return this.editTemplate;
    }
    else{
      return this.readOnlyTemplate;
    }
  }
}
