import { Component, OnInit } from '@angular/core';
import { SelectedUserService } from '../../shared/services/selectedUser.service';
import { User } from '../../shared/models/user.model';

@Component({
    selector: 'app-edit-other-user-info',
    templateUrl: 'edit-other-user-info.component.html',
})
export class EditOtherUserInfoComponent implements OnInit {
    public user: User
    constructor(private selectedUserService: SelectedUserService) { }

    ngOnInit() {
        this.user = this.selectedUserService.get()
    }
}
