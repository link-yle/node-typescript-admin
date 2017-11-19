import { Component, OnInit } from '@angular/core';
import { SelectedUserService } from '../../shared/services/selectedUser.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-edit-other-user-time',
    templateUrl: 'edit-other-user-time.component.html',
})
export class EditOtherUserTimeComponent implements OnInit {
    profileId: string
    constructor(
        private selectedUserService: SelectedUserService,
        private router: Router
    ) { }

    ngOnInit() {
        this.profileId = this.selectedUserService.get()._id
    }

    onEdited() {
        this.router.navigate(['/users/', this.profileId, 'time'])
    }

}
