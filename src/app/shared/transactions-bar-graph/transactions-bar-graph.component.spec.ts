import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsBarGraphComponent } from './transactions-bar-graph.component';

describe('TransactionsBarGraphComponent', () => {
  let component: TransactionsBarGraphComponent;
  let fixture: ComponentFixture<TransactionsBarGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsBarGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
