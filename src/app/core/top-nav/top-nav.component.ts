import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../user.service';
import { PageService } from '../page.service';


@Component({
  selector: 'trdx-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  isSignedIn: Boolean = false;
  isAdmin: Boolean = false;
  isConsumer: Boolean = false;
  userSubscription : Subscription = null;

  constructor(private userService: UserService, private pageService: PageService) { }

  ngOnInit() {
    this.isSignedIn = this.userService.isSignedIn();
    this.isAdmin = this.userService.isAdmin();
    this.isConsumer = this.userService.isConsumer();

    this.userSubscription = this.userService.getUserObservable().subscribe( () => {
      this.isSignedIn = this.userService.isSignedIn();
      this.isAdmin = this.userService.isAdmin();
      this.isConsumer = this.userService.isConsumer();
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

}
