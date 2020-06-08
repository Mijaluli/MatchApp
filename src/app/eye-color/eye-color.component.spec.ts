import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EyeColorComponent } from './eye-color.component';

describe('EyeColorComponent', () => {
  let component: EyeColorComponent;
  let fixture: ComponentFixture<EyeColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EyeColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EyeColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
