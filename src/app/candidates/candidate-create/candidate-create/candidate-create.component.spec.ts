import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { CandidateCreateComponent } from './candidate-create.component';
imports: [

  
  ReactiveFormsModule,
  FormsModule
]

describe('CandidateCreateComponent', () => {
  let component: CandidateCreateComponent;
  let fixture: ComponentFixture<CandidateCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
