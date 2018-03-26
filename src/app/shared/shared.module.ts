import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgxChartsModule } from '@swimlane/ngx-charts';

// Common Models and Services
import { Dataset } from './dataset.model';
import { User } from './user.model';
import { DatasetsService } from './dataset.service';
import { TransactionService } from './transaction.service';
import { AnalyticsService } from './analytics.service';

// Common 'Dumb' Components
import { DatasetListviewComponent } from './dataset-listview/dataset-listview.component';
import { DatasetListviewItemComponent } from './dataset-listview-item/dataset-listview-item.component';
import { PurchaseDatasetModalComponent } from './purchase-dataset-modal/purchase-dataset-modal.component';
import { UploadDatasetModalComponent } from './upload-dataset-modal/upload-dataset-modal.component';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';
import { TransactionsBarGraphComponent } from './transactions-bar-graph/transactions-bar-graph.component';
import { TransactionsAdvancedPieChartComponent } from './transactions-advanced-pie-chart/transactions-advanced-pie-chart.component';
import { TransactionsTimeseriesLineGraphComponent } from './transactions-timeseries-line-graph/transactions-timeseries-line-graph.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    NgxChartsModule
  ],
  declarations: [
    DatasetListviewComponent,
    DatasetListviewItemComponent,
    PurchaseDatasetModalComponent,
    UploadDatasetModalComponent,
    TransactionsTableComponent,
    TransactionsBarGraphComponent,
    TransactionsAdvancedPieChartComponent,
    TransactionsTimeseriesLineGraphComponent
  ],
  exports: [
    DatasetListviewComponent,
    DatasetListviewItemComponent,
    PurchaseDatasetModalComponent,
    UploadDatasetModalComponent,
    TransactionsTableComponent,
    TransactionsBarGraphComponent,
    TransactionsAdvancedPieChartComponent,
    TransactionsTimeseriesLineGraphComponent
  ],
  providers: [
    DatasetsService,
    TransactionService,
    AnalyticsService
  ],
  entryComponents: [
    PurchaseDatasetModalComponent,
    UploadDatasetModalComponent
  ]
})
export class SharedModule { }
