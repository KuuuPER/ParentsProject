import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as Actions from '../store/providers.actions';
import * as fromProviders from '../store/reducers/providers.reducers';
import * as fromSelectors from '../store/reducers/providers.selectors';
import * as fromReducers from '../store/reducers';
import { ProviderModel } from '../src/ProviderModel';
import { PageInfo } from '../../src/PageInfo';

@Component({
  selector: 'app-providers-list',
  templateUrl: './providers-list.component.html',
  styleUrls: ['./providers-list.component.css']
})
export class ProvidersListComponent implements OnInit {
  public providers: Observable<ProviderModel[]>;
  public pageInfo: Observable<PageInfo>;
  public editedProvider: ProviderModel;

  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromReducers.FeatureState>
  ) { }

  ngOnInit() {
    this.providers = this.store.select(fromSelectors.getAllProviders);
    this.pageInfo = this.store.select(fromSelectors.getPageInfo);
  }

  editProvider(provider: ProviderModel){
    this.editedProvider = new ProviderModel(provider.name, provider.id, null, null);
  }

  deleteProvider(id: string){
    this.store.dispatch(new Actions.DeleteProvider(id));
  }

  saveProvider(id: string){
    this.store.dispatch(new Actions.EditProvider({ id: id, provider: this.editedProvider }));
    this.editedProvider = null;
  }

  cancel(){
    this.editedProvider = null;
  }

  loadTemplate(provider: ProviderModel){
    if (this.editedProvider && this.editedProvider.id == provider.id) {
      return this.editTemplate;
    }
    else{
      return this.readOnlyTemplate;
    }
  }
}
