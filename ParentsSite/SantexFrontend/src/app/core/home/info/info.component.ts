import { Component, OnInit } from '@angular/core';

import * as fromReducers from './store/reducers';
import * as fromSelectors from './store/reducers/info.selectors';
import * as Actions from './store/info.actions';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { InfoModel } from '../src/InfoModel';
import { Observable } from 'rxjs/Observable';
import { InfoTypes } from '../src/InfoTypes';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  public infos: Observable<InfoModel[]>

  constructor(private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromReducers.FeatureState>) { }

  ngOnInit() {
    this.infos = this.store.select(fromSelectors.getAllInfos);
    this.infos.subscribe((infos) => {
      for (let index = 0; index < infos.length; index++) {
        const element = infos[index];
        
        setTimeout(() => {
          this.onInfoClose(index);
        }, 7000);
      }
    });
  }

  getContainerClasses(info: InfoModel){
    switch (info.type) {
      case InfoTypes.Success:
          return 'bg-success';
      case InfoTypes.Info:
          return 'bg-warning';
      case InfoTypes.Error:
          return 'bg-danger';
      default:
        return '';        
    }
  }

  getTextClasses(info: InfoModel){
    switch (info.type) {
      case InfoTypes.Success:
          return 'text-success';
      case InfoTypes.Info:
          return 'text-warning';
      case InfoTypes.Error:
          return 'text-danger';
      default:
        return '';        
    }
  }

  onInfoClose(index: number){
    this.store.dispatch(new Actions.DeleteInfo(index));
  }
}
