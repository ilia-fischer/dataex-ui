import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetListviewComponent } from './dataset-listview.component';

describe('DatasetListviewComponent', () => {
  let component: DatasetListviewComponent;
  let fixture: ComponentFixture<DatasetListviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasetListviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetListviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
