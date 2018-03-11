import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromReducer from '../store/reducers';
import * as Actions from '../store/categories.actions';
import * as fromCategories from '../store/reducers/categories.reducers';
import * as fromSelectors from '../store/reducers/categories.selectors';
import * as fromIndex from '../store/reducers/index';
import { CategoryModel } from '../src/CategoryModel';
import { PageInfo } from '../../src/PageInfo';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  public categories: Observable<CategoryModel[]>;
  public pageInfo: Observable<PageInfo>;
  public editedCategory: CategoryModel;

  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromReducer.FeatureState>
  ) { }

  ngOnInit() {
    this.categories = this.store.select(fromSelectors.getAllCategories);
    this.pageInfo = this.store.select(fromSelectors.getPageInfo);
  }

  editCategory(category: CategoryModel){
    this.editedCategory = new CategoryModel(category.name, category.id);
  }

  deleteCategory(id: string){
    this.store.dispatch(new Actions.DeleteCategory(id));
  }

  saveCategory(index: number){
    this.store.dispatch(new Actions.EditCategory({
      index: index,
      category: this.editedCategory
    }));
    // this.store.dispatch({
    //   type: Actions.EDIT_CATEGORY,
    //   payload: { index: index, category: this.editedCategory}
    // });
    this.editedCategory = null;
  }

  getCategories(categories: any){
    let array = [];

    for (let i = 0; i < Object.keys(categories).length; i++) {
      const element = categories[i];
      array.push(element);
    }

    return array;
  }

  cancel(){
    this.editedCategory = null;
  }

  loadTemplate(category: CategoryModel){
    if (this.editedCategory && this.editedCategory.id == category.id) {
      return this.editTemplate;
    }
    else{
      return this.readOnlyTemplate;
    }
  }
}
