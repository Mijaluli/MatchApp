import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HairColorComponent } from './hair-color.component';

describe('HairColorComponent', () => {
  let component: HairColorComponent;
  let fixture: ComponentFixture<HairColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HairColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HairColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
