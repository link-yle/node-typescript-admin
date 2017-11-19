import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
    selector: 'app-add-my-time',
    templateUrl: 'add-my-time.component.html',
})
export class AddMyTimeComponent implements OnInit {
    profileId: string
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.profileId = this.authService.getProfile()._id
    }

    onAdded() {
        this.router.navigate(['/my-time'])
    }

}
