import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtaskinputComponent } from './addtaskinput.component';

describe('AddtaskinputComponent', () => {
  let component: AddtaskinputComponent;
  let fixture: ComponentFixture<AddtaskinputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtaskinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtaskinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
