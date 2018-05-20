import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { INameId } from '../../src/INameId';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-dropdown-form',
  templateUrl: './dropdown-form.component.html',
  styleUrls: ['./dropdown-form.component.css']
})
export class DropdownFormComponent implements OnInit {
  isOpen = false;

  @Output()
  @Input()
  public selectedItem: Observable<INameId>;

  public inputText: string;

  @Input() public controlName: string;

  @Input()
  public form: FormGroup;

  @Input()
  public valueList: Observable<INameId[]>;
  public originalList: INameId[];

  constructor() { }

  ngOnInit() {
    this.controlName;
    
    this.valueList.take(1).subscribe(list => {
      this.originalList = list;
      if (this.selectedItem == null) {
        this.selectedItem = Observable.of(list[0]);
      }
    });    
  }

  toggleDropdown(){
    this.isOpen = !this.isOpen;
  }

  @Output() onItemSelect = new EventEmitter<INameId>()
  itemSelect(element: INameId){
    this.selectedItem = Observable.of(element);
    this.inputText = element.name;
    this.isOpen = false;
    
    this.form.setControl('id', new FormControl(element.id));
    this.form.setControl('name', new FormControl(element.name))
  }

  filterItems(searchText: string){
    if (searchText !== '') {
      this.valueList = this.valueList.filter(list => list.some(l => l.name.includes(searchText)));
    }
    else{
      this.valueList = Observable.of(this.originalList);
    }
  }
}
