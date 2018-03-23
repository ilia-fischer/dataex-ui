import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Dataset } from '../dataset.model';
import { DatasetsService } from '../dataset.service';

@Component({
  selector: 'modal-content',
  templateUrl: './upload-dataset-modal.component.html',
  styleUrls: ['./upload-dataset-modal.component.scss']
})
export class UploadDatasetModalComponent implements OnInit {
  datasetType: string = "PROXY";
  name: string = "";
  description: string = "";
  url: string = "";
  price: number;
  file: File;

  constructor(private router: Router, public bsModalRef: BsModalRef, private datasetService: DatasetsService) { }

  ngOnInit() {
  }

  cancel(){
    this.bsModalRef.hide();
  }

  fileChange(files: FileList){
    console.log(files);
    if(files.length === 1){
      this.file = files[0];
      this.name = this.file.name;
    }
  }

  create(){
    switch(this.datasetType){
      case "PROXY":
        this.createProxyDs();
      break;
      case "UPLOAD":
        this.createUploadDs();
      break;
    }
  }

  private createProxyDs(){
    this.datasetService
      .createUrlDataset(this.name, this.url, this.description, this.price)
      .then( (ds: Dataset) =>{
        console.log(`Created dataset '${ds.name}'`);
        this.bsModalRef.hide();
        location.reload();
      })
      .catch( err => {
        console.error(err);
      });
  }

  private createUploadDs(){
    console.log(this.file);
    let _formData = new FormData();
    _formData.append("Name", this.name);
    _formData.append("MyFile", this.file);
    // let body = this._formData;
    // let headers = new Headers();
    // let options = new Options({
    //     headers: headers
    // });
    // this._http.post("http://example/api/YourAction", body, options)
    //   .map((response:Response) => <string>response.json())
    //   .subscribe((data) => this.message = data);
  }

}
