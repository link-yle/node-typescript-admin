import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
    selector: 'app-my-time',
    templateUrl: 'my-time.component.html',
    styleUrls: ['my-time.component.scss']
})
export class MyTimeComponent implements OnInit {
    public profileId
    constructor(
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.profileId = this.authService.getProfile()._id
    }
}
