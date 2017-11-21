import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

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



}
