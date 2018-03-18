import { Component, OnInit, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Dataset } from '../dataset.model';
import { PurchaseDatasetModalComponent } from '../purchase-dataset-modal/purchase-dataset-modal.component';

@Component({
  selector: 'trdx-dataset-listview-item',
  templateUrl: './dataset-listview-item.component.html',
  styleUrls: ['./dataset-listview-item.component.scss']
})
export class DatasetListviewItemComponent implements OnInit {
  @Input() dataset: Dataset = null;
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {

  }

  purchaseDataset(){
    const initialState = {
      dataset: this.dataset
    };
    this.bsModalRef = this.modalService.show(PurchaseDatasetModalComponent, {initialState});

  }

}
