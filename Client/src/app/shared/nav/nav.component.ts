import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { ManagerClaimsService } from '../services/manager-claims.service';

@Component({
    selector: 'app-nav',
    templateUrl: 'nav.component.html',
    styleUrls: ['nav.component.scss'],
})
export class NavComponent {
    constructor(private dataService: DataService, private authService: AuthService,
        private managerClaimsService: ManagerClaimsService,
        ) { }

    isAtleastManager() {
        return this.managerClaimsService.canActivate()
    }
    isLoggedIn() {
        return this.authService.getToken()
    }
    logout() {
        this.authService.logout()
    }
}
