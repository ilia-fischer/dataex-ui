import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetListviewItemComponent } from './dataset-listview-item.component';

describe('DatasetListviewItemComponent', () => {
  let component: DatasetListviewItemComponent;
  let fixture: ComponentFixture<DatasetListviewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasetListviewItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetListviewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
