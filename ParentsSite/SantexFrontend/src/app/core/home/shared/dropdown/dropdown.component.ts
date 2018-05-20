import { Component, OnInit, Output, Input, HostBinding, EventEmitter } from '@angular/core';
import { INameId } from '../../src/INameId';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  isOpen = false;

  @Output()
  @Input()
  public selectedItem: INameId;

  public inputText: string;

  @Input()
  public valueList: INameId[];
  public originalList: INameId[];

  constructor() { }

  ngOnInit() {
    if (this.selectedItem == null) {
      this.selectedItem = this.valueList[0];
    }

    this.inputText = this.selectedItem.name;
    this.originalList = this.valueList;    
  }

  toggleDropdown(){
    this.isOpen = !this.isOpen;
  }

  @Output() onItemSelect = new EventEmitter<INameId>()
  itemSelect(element: INameId){
    this.inputText = element.name;
    this.isOpen = false;
    this.onItemSelect.emit(element);
  }

  filterItems(searchText: string){
    if (searchText !== '') {
      this.valueList = this.valueList.filter(i => i.name.includes(searchText));
    }
    else{
      this.valueList = this.originalList;
    }
  }
}
