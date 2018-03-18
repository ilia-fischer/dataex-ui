import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDatasetModalComponent } from './upload-dataset-modal.component';

describe('UploadDatasetModalComponent', () => {
  let component: UploadDatasetModalComponent;
  let fixture: ComponentFixture<UploadDatasetModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDatasetModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDatasetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
