import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-edit-my-time',
    templateUrl: 'edit-my-time.component.html',
})
export class EditMyTimeComponent implements OnInit {
    profileId: string
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.profileId = this.authService.getProfile()._id
    }

    onEdited() {
        this.router.navigate(['/my-time'])
    }

}
