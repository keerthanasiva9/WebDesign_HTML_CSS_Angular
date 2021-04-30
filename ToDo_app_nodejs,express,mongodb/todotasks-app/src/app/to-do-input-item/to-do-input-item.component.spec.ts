import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoInputItemComponent } from './to-do-input-item.component';

describe('ToDoInputItemComponent', () => {
  let component: ToDoInputItemComponent;
  let fixture: ComponentFixture<ToDoInputItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToDoInputItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoInputItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
