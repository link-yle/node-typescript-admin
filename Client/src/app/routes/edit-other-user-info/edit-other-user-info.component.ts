import { Component, OnInit } from '@angular/core';
import { SelectedUserService } from '../../shared/services/selectedUser.service';

@Component({
    selector: 'app-edit-other-user-info',
    templateUrl: 'edit-other-user-info.component.html',
    styleUrls: ['edit-other-user-info.component.scss']
})
export class EditOtherUserInfoComponent implements OnInit {
    public profileId: string
    constructor(private selectedUserService: SelectedUserService) { }

    ngOnInit() {
        this.profileId = this.selectedUserService.get()._id
    }
}
