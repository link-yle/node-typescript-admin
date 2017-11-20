import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-authenticated-navbar',
    templateUrl: 'authenticated-navbar.component.html',
})
export class AuthenticatedNavbarComponent {
    constructor(
        private authService: AuthService,
    ) { }
    logout() {
        this.authService.logout()
    }



}
