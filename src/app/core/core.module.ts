import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* App Core (Singleton) Components, Guards, And Services */
import { TopNavComponent } from './top-nav/top-nav.component';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';
import { PageService } from './page.service';
import { LoginAuthGuard } from './guards/login-auth.guard';
import { GlobalSearchComponent } from './global-search/global-search.component';
import { GlobalSearchService } from './global-search/global-search.service';
import { SettingsService } from './settings.service';
import { AddTokenInterceptor } from './interceptors/add-token.interceptor'


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  declarations: [
    TopNavComponent,
    GlobalSearchComponent
  ],
  exports: [
    TopNavComponent,
    GlobalSearchComponent
  ],
  providers: [
    LoginAuthGuard,
    AuthenticationService,
    UserService,
    PageService,
    GlobalSearchService,
    SettingsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddTokenInterceptor,
      multi: true
    }
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
