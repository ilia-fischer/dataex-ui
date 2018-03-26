import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsTimeseriesLineGraphComponent } from './transactions-timeseries-line-graph.component';

describe('TransactionsTimeseriesLineGraphComponent', () => {
  let component: TransactionsTimeseriesLineGraphComponent;
  let fixture: ComponentFixture<TransactionsTimeseriesLineGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsTimeseriesLineGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsTimeseriesLineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
