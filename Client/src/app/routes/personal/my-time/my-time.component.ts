import { TimingsService } from '../../../shared/services/timings.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Timezone } from '../../../shared/models/timezone.model';

@Component({
    selector: 'app-my-time',
    templateUrl: 'my-time.component.html',
})
export class MyTimeComponent {
    public profileId
    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private timingsService: TimingsService
    ) {
        this.profileId = this.authService.getProfile()._id
     }

    onAddClicked() {
        this.router.navigate(['/my-time/add'])
    }

    onEditClicked(item: Timezone) {
        this.timingsService.saveSelectedTiming(item)
        this.router.navigate(['/my-time/edit'])
    }
}
