import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule, APP_BASE_HREF } from '@angular/common';

import { SnackBarService } from './services/snackbar.service';
import { SelectedUserService } from './services/selectedUser.service';
import { AuthGuardService } from './services/auth.guard.service';
import { PublicInfoService } from './services/public.info.service';
import { AuthService } from './services/auth.service';
import { TimingsService } from './services/timings.service';
import { DataService } from './services/data.service';
import { AdminClaimsService } from './services/admin-claims.service';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EnvironmentApiInterceptor } from 'app/core/http-interceptors/environment-api-url-interceptor';
import { UnAuthorizedRequestsInterceptor } from 'app/core/http-interceptors/unauthorized-requests-interceptor';
import { AuthInterceptor } from 'app/core/http-interceptors/authentication-interceptor';
import { NgProgressInterceptor } from 'ngx-progressbar';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [],
    declarations: [],
    providers: [
        AuthService,
        SnackBarService,
        TimingsService,
        SelectedUserService,
        DataService,
        AdminClaimsService,
        AuthGuardService,
        PublicInfoService,
        { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: EnvironmentApiInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: UnAuthorizedRequestsInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: APP_BASE_HREF, useValue: '/' }
    ],

})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
