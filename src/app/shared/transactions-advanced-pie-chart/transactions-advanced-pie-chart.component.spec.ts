import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsAdvancedPieChartComponent } from './transactions-advanced-pie-chart.component';

describe('TransactionsAdvancedPieChartComponent', () => {
  let component: TransactionsAdvancedPieChartComponent;
  let fixture: ComponentFixture<TransactionsAdvancedPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsAdvancedPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsAdvancedPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
