import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseDatasetModalComponent } from './purchase-dataset-modal.component';

describe('PurchaseDatasetModalComponent', () => {
  let component: PurchaseDatasetModalComponent;
  let fixture: ComponentFixture<PurchaseDatasetModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseDatasetModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseDatasetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
