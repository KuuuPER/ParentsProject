import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromReducers from '../store/reducers';
import * as fromSelectors from '../store/reducers/manufactures.selectors';
import * as Actions from '../store/manufactures.actions';
import { ManufactureModel } from '../src/ManufactureModel';

@Component({
  selector: 'app-manufacture',
  templateUrl: './manufacture.component.html',
  styleUrls: ['./manufacture.component.css']
})
export class ManufactureComponent implements OnInit {
  manufactureForm: FormGroup;
  
  manufacturesState: Observable<ManufactureModel[]>;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromReducers.FeatureState>) { }

  ngOnInit() {
    this.manufacturesState = this.store.select(fromSelectors.getAllManufactures);

    this.initForm();
  }

  initForm(){
    this.manufactureForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'description': new FormControl('')  
    });
  }

  addManufacture(){
    let newManufacture = <ManufactureModel>this.manufactureForm.value;
    this.store.dispatch(new Actions.AddManufacture(newManufacture))
    this.onCancel();
  }
  
  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
