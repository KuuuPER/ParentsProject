import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as Actions from '../store/categories.actions';
import * as fromCategories from '../store/categories.reducers';
import { CategoryModel } from '../src/CategoryModel';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  categoriesState: Observable<fromCategories.State>;
  editedCategory: CategoryModel;

  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromCategories.FeatureState>
  ) { }

  ngOnInit() {
    this.categoriesState = this.store.select('categories');
  }

  editCategory(category: CategoryModel){
    this.editedCategory = new CategoryModel(category.Name, category.Id);
  }

  deleteCategory(index: number){
    this.store.dispatch(new Actions.DeleteCategory(index));
  }

  saveCategory(index: number){
    this.store.dispatch(new Actions.EditCategory({ index: index, category: this.editedCategory }));
    this.editedCategory = null;
  }

  cancel(){
    this.editedCategory = null;
  }

  loadTemplate(category: CategoryModel){
    if (this.editedCategory && this.editedCategory.Id == category.Id) {
      return this.editTemplate;
    }
    else{
      return this.readOnlyTemplate;
    }
  }
}
