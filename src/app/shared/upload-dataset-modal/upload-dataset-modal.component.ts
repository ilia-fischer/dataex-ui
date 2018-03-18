import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Dataset } from '../dataset.model';

@Component({
  selector: 'modal-content',
  templateUrl: './upload-dataset-modal.component.html',
  styleUrls: ['./upload-dataset-modal.component.scss']
})
export class UploadDatasetModalComponent implements OnInit {
  name: string = "";
  description: string = "";
  file: File;

  constructor(public bsModalRef: BsModalRef) { }

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

  upload(){
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
