import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatasetsComponent } from './datasets.component';
import { DatasetsSearchComponent } from './datasets-search/datasets-search.component';
import { DatasetsDetailComponent } from './datasets-detail/datasets-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DatasetsComponent,
    children: [
      { path: '', component: DatasetsSearchComponent },
      { path: ':id', component: DatasetsDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatasetsRoutingModule { }

export const routedComponents = [DatasetsComponent];
