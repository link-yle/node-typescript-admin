import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectedUserService } from '../../shared/services/selectedUser.service';

@Component({
    selector: 'app-add-other-user-time',
    templateUrl: 'add-other-user-time.component.html',
})
export class AddOtherUserTimeComponent implements OnInit {
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
