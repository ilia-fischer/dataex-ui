import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../user.service';
import { PageService } from '../page.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UploadDatasetModalComponent } from '../../shared/upload-dataset-modal/upload-dataset-modal.component';


@Component({
  selector: 'trdx-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  bsModalRef: BsModalRef;
  isSignedIn: Boolean = false;
  isAdmin: Boolean = false;
  isConsumer: Boolean = false;
  isProvider: Boolean = false;
  userSubscription : Subscription = null;

  constructor(private userService: UserService, private pageService: PageService, private modalService: BsModalService) { }

  ngOnInit() {
    this.isSignedIn = this.userService.isSignedIn();
    this.isAdmin = this.userService.isAdmin();
    this.isConsumer = this.userService.isConsumer();
    this.isProvider = this.userService.isProvider();

    this.userSubscription = this.userService.getUserObservable().subscribe( () => {
      this.isSignedIn = this.userService.isSignedIn();
      this.isAdmin = this.userService.isAdmin();
      this.isConsumer = this.userService.isConsumer();
      this.isProvider = this.userService.isProvider();
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  signOut() {
    this.userService.signOut();
    this.pageService.goToLoginPage();
  }

  goToLoginPage(){
    this.pageService.goToLoginPage();
  }

  goToDefaultPage() {
    this.pageService.goToDefaultPage();
  }

  goToMyAccount() {
    if(this.isSignedIn){
      this.pageService.goToAccountPage();
    }
  }

  goToAdminPage() {
    if(this.isSignedIn && this.isAdmin){
      this.pageService.goToAdminPage();
    }
  }

  goToDatasetPage() {
    if(this.isSignedIn && this.isConsumer){
      this.pageService.goToDatasetPage();
    }
  }

  uploadDataset(){
    if(this.isSignedIn && this.isProvider){
      this.bsModalRef = this.modalService.show(UploadDatasetModalComponent, {});
    }
  }

}
