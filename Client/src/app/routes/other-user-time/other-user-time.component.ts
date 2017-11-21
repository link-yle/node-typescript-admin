import { Component, OnInit } from '@angular/core';
import { SelectedUserService } from '../../shared/services/selectedUser.service';
import { Router } from '@angular/router';
import { TimingsService } from '../../shared/services/timings.service';
import { Timezone } from '../../shared/models/timezone.model';

@Component({
    selector: 'app-other-user-time',
    templateUrl: 'other-user-time.component.html',
})
export class OtherUserTimeComponent implements OnInit {
    public profileId: string
    public title: string
    constructor(
        private selectedUserService: SelectedUserService,
        private router: Router,
        private timingsService: TimingsService
    ) {
        if (!this.selectedUserService.get()) this.router.navigate(['users'])
     }

    ngOnInit() {
        const user = this.selectedUserService.get()
        this.profileId = user._id
        this.title = `${user.name} Timings`
    }

    onAddClicked() {
        this.router.navigate(['users', this.profileId, 'time', 'add'])
    }
    onEditClicked(item: Timezone) {
        this.timingsService.saveSelectedTiming(item)
        this.router.navigate(['users', this.profileId, 'time', 'edit'])
    }
}
