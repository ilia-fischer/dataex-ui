import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import { ProfileComponent } from './profile/profile.component';
import { ProvidedDatasetsComponent } from './provided-datasets/provided-datasets.component';
import { PurchasedDatasetsComponent } from './purchased-datasets/purchased-datasets.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      { path: '', component: ProfileComponent },
      { path: 'my-datasets', component: ProvidedDatasetsComponent },
      { path: 'purchased-datasets', component: PurchasedDatasetsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule { }

export const routedComponents = [AccountComponent];
