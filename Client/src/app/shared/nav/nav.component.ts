import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-nav',
    templateUrl: 'nav.component.html',
    styleUrls: ['nav.component.scss'],
})
export class NavComponent {
    constructor(private dataService: DataService, private authService: AuthService) { }

    logout() {
        this.authService.logout()
    }
}
