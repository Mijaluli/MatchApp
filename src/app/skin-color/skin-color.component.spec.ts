import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkinColorComponent } from './skin-color.component';

describe('SkinColorComponent', () => {
  let component: SkinColorComponent;
  let fixture: ComponentFixture<SkinColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkinColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkinColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
