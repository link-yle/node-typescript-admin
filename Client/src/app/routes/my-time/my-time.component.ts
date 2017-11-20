import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-my-time',
    templateUrl: 'my-time.component.html',
})
export class MyTimeComponent implements OnInit {
    public profileId
    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.profileId = this.authService.getProfile()._id
    }

    onAddClicked() {
        this.router.navigate(['/my-time/add'])
    }
}
