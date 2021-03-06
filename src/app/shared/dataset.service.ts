import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';

import { Dataset } from './dataset.model';
import { User } from './user.model';
import { SettingsService } from '../core/settings.service';
import { UserService } from '../core/user.service';

const DATASET_URL = './assets/mocks/datasets.json';

@Injectable()
export class DatasetsService {
  private static readonly DATASET_URL = '/datasets';

  constructor(private http: HttpClient, private settingsService: SettingsService, private userService : UserService) { }

  private getBaseUrl(){
    return `${this.settingsService.apiUrl()}${DatasetsService.DATASET_URL}`;
  }

  private isConsumedByUser(dataset: Dataset, user: User): boolean{
    return !!dataset.consumers.find((c)=>c.consumerId === user.email);
  }

  private isProvidedByUser(dataset: Dataset, user: User): boolean{
    return dataset.provider && dataset.provider['providerId'] === user.email;
  }

  private migrateDatasets(datasets): Dataset[]{
    const user = this.userService.getUser();
    datasets.forEach((d: Dataset) => {
      d.isConsumedByCurrentUser = this.isConsumedByUser(d, user);
      d.isProvidedByCurrentUser = this.isProvidedByUser(d, user);
      d.publicUrl = `${this.settingsService.apiUrl()}/dataaccess/proxy/${d._id}`;
    });
    return datasets;
  }

  private migrateDataset(dataset): Dataset{
    const user = this.userService.getUser();
    dataset.isConsumedByCurrentUser = this.isConsumedByUser(dataset, user);
    dataset.isProvidedByCurrentUser = this.isProvidedByUser(dataset, user);
    dataset.publicUrl = `${this.settingsService.apiUrl()}/dataaccess/proxy/${dataset._id}`;
    return dataset;
  }

  getAllDatasets(): Observable<Dataset[]>{
    return this.http.get<Dataset[]>(this.getBaseUrl())
      .map(this.migrateDatasets.bind(this));
  }

  getDataSetById(id: string): Observable<Dataset>{
    return this.http.get<Dataset>(`${this.getBaseUrl()}/${id}`)
      .map(this.migrateDataset.bind(this));
  }

  getProvidedDatasets(user: User): Observable<Dataset[]>{
    return this.http.get<Dataset[]>(`${this.getBaseUrl()}?provider=${encodeURIComponent(user.email)}`)
      .map(this.migrateDatasets.bind(this));
  }

  purchaseDataset(dataset: Dataset): Observable<Dataset>{
    return this.http.post<Dataset>(`${this.getBaseUrl()}/buy/${dataset._id}`, {});
  }

  getPurchasedDatasets(user: User): Observable<Dataset[]>{
    return this.getAllDatasets()
      .map((datasets: Dataset[]) => {
        return datasets.filter( ds => {
          return this.isConsumedByUser(ds, user);
        } );
      });
  }

  findDatasets(query: string): Observable<Dataset[]>{
    return this.getAllDatasets()
      .map((datasets: Dataset[]) => {
          return datasets.filter( ds => {
            return (ds.name || "").toLowerCase().includes(query) ||
              (ds.description || "").toLowerCase().includes(query) ||
              (ds.categories || []).find((s) => s.includes(query))
          } );
        });
  }

  createUrlDataset(name: string, url: string, description: string, price: number) : Promise<Dataset>{
    let options = {
      name: name,
      description: description,
      price: price,
      format: "",
      url: url,
      notes: ""
    };
    return this.http.post<Dataset>(this.getBaseUrl(), options).toPromise();
  }
}
