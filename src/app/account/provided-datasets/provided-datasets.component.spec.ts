import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidedDatasetsComponent } from './provided-datasets.component';

describe('ProvidedDatasetsComponent', () => {
  let component: ProvidedDatasetsComponent;
  let fixture: ComponentFixture<ProvidedDatasetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvidedDatasetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidedDatasetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
