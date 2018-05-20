import { Component, OnInit, Input } from '@angular/core';
import { ContactModel } from '../../purchases/src/ContactModel';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input() form: FormGroup;
  constructor() { }

  ngOnInit() {
  }
}
