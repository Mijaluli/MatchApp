import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateStatisticsComponent } from './candidate-statistics.component';

describe('CandidateStatisticsComponent', () => {
  let component: CandidateStatisticsComponent;
  let fixture: ComponentFixture<CandidateStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
