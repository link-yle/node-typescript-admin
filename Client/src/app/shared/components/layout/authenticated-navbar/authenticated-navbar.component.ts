import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/services/auth.service';

@Component({
    selector: 'app-authenticated-navbar',
    templateUrl: 'authenticated-navbar.component.html',
})
export class AuthenticatedNavbarComponent {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }
    logout() {
        this.authService.logout()
        this.router.navigate(['/login'])
    }

    isAtleastManager() {
        return this.authService.isAtleastManager()
    }



}
