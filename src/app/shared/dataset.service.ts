import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Dataset } from './dataset.model';

const DATASET_URL = './assets/mocks/datasets.json';

@Injectable()
export class DatasetsService {
  constructor(private http: Http) { }

  getAllDatasets(): Observable<Dataset[]>{
    return this.http.get(DATASET_URL)
      .map((response: Response) => {
        return response.json()
      });
  }

//   getDatasets(query, facets): Observable<Dataset[]>{
//     return this.http.get(DATASET_URL)
//       .map((response: Response) => {
//         let datasets = response.json();
//         return datasets.filter( ds => ds.name.toLowerCase().includes(query.toLowerCase()) );
//       });
//   }

}
