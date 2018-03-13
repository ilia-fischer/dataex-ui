import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAuthGuard } from './core/guards/login-auth.guard';
import { PageService } from './core/page.service'

const routes: Routes = [
    /* Home Page is disabled for now. It could be a description page thats dies not require login.
    { path: PageService.HOME_DESCRIPTION_ROUTE, loadChildren: './home/home.module#HomeModule'}, */
    { path: PageService.LOGIN_ROUTE, loadChildren: './login/login.module#LoginModule'},
    { path: PageService.DATASETS_ROUTE, loadChildren: './datasets/datasets.module#DatasetsModule', canActivate: [LoginAuthGuard]},
    { path: PageService.ADMIN_ROUTE, loadChildren: './admin/admin.module#AdminModule', canActivate: [LoginAuthGuard]},
    { path: PageService.ACCOUNT_ROUTE, loadChildren: './account/account.module#AccountModule', canActivate: [LoginAuthGuard]},
    //Otherwise go home
    { path: '**', redirectTo: PageService.DATASETS_ROUTE }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
