import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnackBarService } from './services/snackbar.service';
import { SelectedUserService } from './services/selectedUser.service';
import { AuthGuardService } from './services/auth.guard.service';
import { PublicInfoService } from './services/public.info.service';
import { AuthService } from './services/auth.service';
import { TimingsService } from './services/timings.service';
import { DataService } from './services/data.service';
import { AdminClaimsService } from './services/admin-claims.service';
import { throwIfAlreadyLoaded } from './module-import-guard';

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
    ],

})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
