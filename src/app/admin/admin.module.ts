import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { TransactionsComponent } from './transactions/transactions.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    TransactionsComponent,
    UsersComponent
  ]
})
export class AdminModule { }
