import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedDatasetsComponent } from './purchased-datasets.component';

describe('PurchasedDatasetsComponent', () => {
  let component: PurchasedDatasetsComponent;
  let fixture: ComponentFixture<PurchasedDatasetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasedDatasetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedDatasetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
