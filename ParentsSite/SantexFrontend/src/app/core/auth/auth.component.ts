import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";

import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public authForm: FormGroup
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): any {
    this.authForm = new FormGroup({
      'login': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
    });
  }

  onSignin(){
    let login = this.authForm.get('login').value;
    let password = this.authForm.get('password').value;
    
    this.store.dispatch(new AuthActions.TrySignin({username: login, password: password }));
  }
}
