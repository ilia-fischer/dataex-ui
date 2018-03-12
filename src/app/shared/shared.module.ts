import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Common Models and Services
import { Dataset } from './dataset.model';
import { User } from './user.model';
import { DatasetsService } from './dataset.service';

// Common 'Dumb' Components
import { DatasetListviewComponent } from './dataset-listview/dataset-listview.component';
import { DatasetListviewItemComponent } from './dataset-listview-item/dataset-listview-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DatasetListviewComponent,
    DatasetListviewItemComponent
  ],
  exports: [
    DatasetListviewComponent,
    DatasetListviewItemComponent
  ],
  providers: [
    DatasetsService
  ]
})
export class SharedModule { }
