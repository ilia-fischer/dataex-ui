import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetsSearchComponent } from './datasets-search.component';

describe('SearchComponent', () => {
  let component: DatasetsSearchComponent;
  let fixture: ComponentFixture<DatasetsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasetsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
