import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

/* App Core (Singleton) Components, Guards, And Services */
import { TopNavComponent } from './top-nav/top-nav.component';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';
import { PageService } from './page.service';
import { LoginAuthGuard } from './guards/login-auth.guard';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    TopNavComponent
  ],
  exports: [
    TopNavComponent
  ],
  providers: [
    LoginAuthGuard,
    AuthenticationService,
    UserService,
    PageService
  ]
})
export class CoreModule {
    /* make sure CoreModule is imported only by one NgModule the AppModule */
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import only in AppModule');
        }
    }
}
