import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

// Common Models and Services
import { Dataset } from './dataset.model';
import { User } from './user.model';
import { DatasetsService } from './dataset.service';

// Common 'Dumb' Components
import { DatasetListviewComponent } from './dataset-listview/dataset-listview.component';
import { DatasetListviewItemComponent } from './dataset-listview-item/dataset-listview-item.component';
import { PurchaseDatasetModalComponent } from './purchase-dataset-modal/purchase-dataset-modal.component';
import { UploadDatasetModalComponent } from './upload-dataset-modal/upload-dataset-modal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  declarations: [
    DatasetListviewComponent,
    DatasetListviewItemComponent,
    PurchaseDatasetModalComponent,
    UploadDatasetModalComponent
  ],
  exports: [
    DatasetListviewComponent,
    DatasetListviewItemComponent,
    PurchaseDatasetModalComponent,
    UploadDatasetModalComponent
  ],
  providers: [
    DatasetsService
  ],
  entryComponents: [
    PurchaseDatasetModalComponent,
    UploadDatasetModalComponent
  ]
})
export class SharedModule { }
