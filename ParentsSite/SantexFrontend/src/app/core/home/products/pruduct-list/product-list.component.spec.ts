/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PruductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: PruductListComponent;
  let fixture: ComponentFixture<PruductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
