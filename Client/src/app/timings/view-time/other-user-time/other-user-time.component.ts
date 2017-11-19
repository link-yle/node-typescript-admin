import { Component, OnInit } from '@angular/core';
import { SelectedUserService } from '../../../shared/services/selectedUser.service';

@Component({
    selector: 'app-other-user-time',
    templateUrl: 'other-user-time.component.html',
})
export class OtherUserTimeComponent implements OnInit {
    public profileId
    constructor(
        private selectedUserService: SelectedUserService
    ) { }

    ngOnInit() {
        this.profileId = this.selectedUserService.get()
    }
}
