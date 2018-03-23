import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { DatasetsService } from '../../shared/dataset.service';
import { Dataset } from '../../shared/dataset.model';

@Component({
  selector: 'trdx-datasets-detail.',
  templateUrl: './datasets-detail.component.html',
  styleUrls: ['./datasets-detail.component.scss']
})
export class DatasetsDetailComponent implements OnInit {
  datasetId: string;
  dataset: Dataset = null;
  idNotFound: Boolean = false;

  constructor(private route: ActivatedRoute, private datasetService: DatasetsService) { }

  ngOnInit() {
    this.route.params
      .switchMap( (params) => {
        this.datasetId = params.id;
        return this.datasetService.getDataSetById(this.datasetId);
      })
      .subscribe((ds: Dataset) => {
        if(ds == null || typeof ds === 'undefined'){
          this.idNotFound = true;
        }
        else this.dataset = ds;
      });
  }

  purchaseDataset(){
    // const initialState = {
    //   dataset: this.dataset
    // };
    // this.bsModalRef = this.modalService.show(PurchaseDatasetModalComponent, {initialState});

  }

}
