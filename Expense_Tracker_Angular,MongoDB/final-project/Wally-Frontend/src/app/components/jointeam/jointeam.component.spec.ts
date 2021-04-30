import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JointeamComponent } from './jointeam.component';

describe('JointeamComponent', () => {
  let component: JointeamComponent;
  let fixture: ComponentFixture<JointeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JointeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JointeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
