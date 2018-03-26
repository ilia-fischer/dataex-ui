import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Dataset } from '../dataset.model';
import { DatasetsService } from '../dataset.service';

@Component({
  selector: 'modal-content',
  templateUrl: './purchase-dataset-modal.component.html',
  styleUrls: ['./purchase-dataset-modal.component.scss']
})
export class PurchaseDatasetModalComponent implements OnInit {
  purchaseSuccess = false;
  dataset: Dataset;
  purchaseModels = [];
  purchaseModel;

  constructor(public bsModalRef: BsModalRef, private datasetService: DatasetsService) { }

  ngOnInit() {

    this.purchaseModels = [
      {
        text: `Subscribe ($${this.dataset.price} per API call)`,
        purchaseActionText: "Subscribe",
        enabled: true,
        purchaseAction: () => {
          this.buy();
        }
      },
      {
        text: `Buy ($${this.dataset.price})`,
        purchaseActionText: "Buy",
        enabled: false,
        purchaseAction: () => {
          this.buy();
        }
      }
    ];

    this.purchaseModel = this.purchaseModels.find(m => m.enabled);

  }

  selectPurchaseModel(purchaseModel){
    if(purchaseModel.enabled){
      this.purchaseModel = purchaseModel;
    }
  }

  cancel(){
    this.bsModalRef.hide();
  }

  buy(){
    this.purchaseSuccess = true;
    this.datasetService.purchaseDataset(this.dataset)
      .subscribe((ds: Dataset) => {
        console.log('Dataset purchased!');
        this.bsModalRef.hide();
        location.reload();
      },
      (err) => {
        console.error('Error buying dataset.', err);
      });
  }

}
