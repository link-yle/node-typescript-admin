import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectedUserService } from '../../shared/services/selectedUser.service';

@Component({
    selector: 'app-other-user-time',
    templateUrl: 'other-user-time.component.html',
    styleUrls: ['other-user-time.component.scss']
})
export class AddMyTimeComponent implements OnInit {
    profileId: string
    constructor(
        private selectedUserService: SelectedUserService,
        private router: Router
    ) { }

    ngOnInit() {
        this.profileId = this.selectedUserService.get()._id
    }

    onAdded() {
        this.router.navigate(['/users/', this.profileId, 'time' ])
    }
}
