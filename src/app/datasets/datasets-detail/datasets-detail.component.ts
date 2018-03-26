import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { DatasetsService } from '../../shared/dataset.service';
import { Dataset } from '../../shared/dataset.model';
import { UserService } from '../../core/user.service';

@Component({
  selector: 'trdx-datasets-detail.',
  templateUrl: './datasets-detail.component.html',
  styleUrls: ['./datasets-detail.component.scss']
})
export class DatasetsDetailComponent implements OnInit {
  datasetId: string;
  dataset: Dataset = null;
  idNotFound: Boolean = false;

  //chart
  view: any[] = [700, 400];

  single = [{name: '', value: 0}];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private route: ActivatedRoute, private datasetService: DatasetsService, private router: Router, private userService: UserService) { }

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
        else {
          this.dataset = ds;
          this.datasetService.getAllDatasets()
            .subscribe( (datasets: Dataset[]) => {
                var counter = [];
                this.dataset.categories.map((ct) => {counter[ct] = 0});
                datasets.map((next) => {
                  next.categories.map(ct => {
                    if(ct in counter)
                      counter[ct]++;
                  });
                });
                this.single = Object.entries(counter).map(([ct, count]) => ({name: ct, value: parseInt(count)}));
            });
        }
      });
    }

    purchaseDataset(){
    // const initialState = {
    //   dataset: this.dataset
    // };
    // this.bsModalRef = this.modalService.show(PurchaseDatasetModalComponent, {initialState});

    }

    onChartSelect(event){
      if(this.userService.isConsumer())
        this.router.navigateByUrl(`/datasets?search=${event.name}`);
    }

    xAxisTickFormatting(value) {
      if(parseInt(value) == value)
        return parseInt(value);
      else
        return '';
    }

}
