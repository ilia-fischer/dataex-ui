import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ProvidedDatasetsComponent } from './provided-datasets/provided-datasets.component';
import { PurchasedDatasetsComponent } from './purchased-datasets/purchased-datasets.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    AccountRoutingModule
  ],
  declarations: [
    AccountComponent,
    ProfileComponent,
    ProvidedDatasetsComponent,
    PurchasedDatasetsComponent
  ]
})
export class AccountModule { }
