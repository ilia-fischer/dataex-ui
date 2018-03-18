import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Dataset } from '../dataset.model';

@Component({
  selector: 'modal-content',
  templateUrl: './purchase-dataset-modal.component.html',
  styleUrls: ['./purchase-dataset-modal.component.scss']
})
export class PurchaseDatasetModalComponent implements OnInit {
  purchaseSuccess = false;
  dataset: Dataset;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {

  }

  cancel(){
    this.bsModalRef.hide();
  }

  buy(){
    this.purchaseSuccess = true;
    this.bsModalRef.hide();
  }

}
