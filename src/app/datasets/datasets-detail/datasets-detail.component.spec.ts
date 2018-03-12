import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetsDetailComponent } from './datasets-detail.component';

describe('DetailComponent', () => {
  let component: DatasetsDetailComponent;
  let fixture: ComponentFixture<DatasetsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasetsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
