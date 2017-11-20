import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-home-layout',
    templateUrl: 'home-layout.component.html',
})
export class HomeLayoutComponent {
    constructor(
        private authService: AuthService,
    ) { }
    logout() {
        this.authService.logout()
    }



}
