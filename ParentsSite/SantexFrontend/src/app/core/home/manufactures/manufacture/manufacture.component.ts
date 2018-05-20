import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromReducers from '../store/reducers';
import * as fromSelectors from '../store/reducers/manufactures.selectors';
import * as fromManufactures from '../store/reducers/manufactures.reducers';
import * as Actions from '../store/manufactures.actions';
import { ManufactureModel } from '../src/ManufactureModel';

@Component({
  selector: 'app-manufacture',
  templateUrl: './manufacture.component.html',
  styleUrls: ['./manufacture.component.css']
})
export class ManufactureComponent implements OnInit {
  public manufactureForm: FormGroup;  
  public manufactures: Observable<ManufactureModel[]>;
  public id: string;
  public editManufacture: Observable<ManufactureModel>;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromReducers.FeatureState>) { }

  ngOnInit() {
    this.manufactures = this.store.select(fromSelectors.getAllManufactures);
    this.editManufacture = this.store.select(fromSelectors.getEditManufacture);

    this.route.params.subscribe((params: Params) => {
      if (params['id'] !== undefined) {
        this.id = params['id'];        

        this.store.dispatch(new Actions.GetManufacture(this.id));
        this.editManufacture.skip(1)
        .take(1)
        .subscribe(c => {
          this.initForm(<ManufactureModel>c);
        });
      }
      else{
        this.initForm();
      }
    });

    this.initForm();
  }

  initForm(manufacture: ManufactureModel = null){    
    if(manufacture == null){
      manufacture = new ManufactureModel('', '', '');
    }

    this.manufactureForm = new FormGroup({
      'name': new FormControl(manufacture.name, Validators.required),
      'country': new FormControl(manufacture.country, Validators.required),
      'description': new FormControl(manufacture.description)
    });
  }

  addManufacture(){
    let newManufacture = <ManufactureModel>this.manufactureForm.value;
    if (this.id) {
      newManufacture.id = this.id;
      this.store.dispatch(new Actions.EditManufacture({manufacture: newManufacture, id: this.id}));
    }
    else{
      this.store.dispatch(new Actions.AddManufacture(newManufacture));
    }
  }
  
  onCancel(){
    this.router.navigate(['/home/manufactures'], {relativeTo: this.route});
  }
}
