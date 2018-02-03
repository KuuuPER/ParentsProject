import { Component, OnInit, Output, Input, HostBinding, EventEmitter } from '@angular/core';
import { INameId } from '../../src/INameId';

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

    this.inputText = this.selectedItem.Name;
    this.originalList = this.valueList;
  }

  toggleDropdown(){
    this.isOpen = !this.isOpen;
  }

  @Output() onItemSelect = new EventEmitter<INameId>()
  itemSelect(element: INameId){
    this.selectedItem = element;
    this.inputText = element.Name;
    this.isOpen = false;
    this.onItemSelect.emit(element);
  }

  filterItems(searchText: string){
    if (searchText !== '') {
      this.valueList = this.valueList.filter(i => i.Name.includes(searchText));
    }
    else{
      this.valueList = this.originalList;
    }
  }
}
