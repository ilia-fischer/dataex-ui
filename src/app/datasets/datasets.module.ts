import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { DatasetsComponent } from './datasets.component';
import { DatasetsRoutingModule } from './datasets-routing.module';
import { DatasetsSearchComponent } from './datasets-search/datasets-search.component';
import { DatasetsDetailComponent } from './datasets-detail/datasets-detail.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        DatasetsRoutingModule,
        NgxChartsModule
    ],
    declarations: [
        DatasetsComponent,
        DatasetsSearchComponent,
        DatasetsDetailComponent
    ]
})
export class DatasetsModule { }
