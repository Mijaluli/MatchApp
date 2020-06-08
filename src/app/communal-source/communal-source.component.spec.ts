import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunalSourceComponent } from './communal-source.component';

describe('CommunalSourceComponent', () => {
  let component: CommunalSourceComponent;
  let fixture: ComponentFixture<CommunalSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunalSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunalSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
