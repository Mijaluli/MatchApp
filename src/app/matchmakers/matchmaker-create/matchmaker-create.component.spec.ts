import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchmakerCreateComponent } from './matchmaker-create.component';

describe('MatchmakerCreateComponent', () => {
  let component: MatchmakerCreateComponent;
  let fixture: ComponentFixture<MatchmakerCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchmakerCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchmakerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
