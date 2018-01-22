import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromApp from '../../../store/app.reducers';
import * as fromAuth from '../../../core/auth/store/auth.reducers';

@Component({
  selector: 'app-start-header',  
  styleUrls: ['./start-header.component.css'],
  templateUrl: './start-header.component.html'
})
export class StartHeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private store: Store<fromApp.AppState>) {
    
  }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }
}