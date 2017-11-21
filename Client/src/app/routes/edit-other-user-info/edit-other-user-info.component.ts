import { Component, OnInit } from '@angular/core';
import { SelectedUserService } from '../../shared/services/selectedUser.service';
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';

@Component({
    selector: 'app-edit-other-user-info',
    templateUrl: 'edit-other-user-info.component.html',
})
export class EditOtherUserInfoComponent implements OnInit {
    public user: User
    public title: string
    constructor(
        private selectedUserService: SelectedUserService,
        private router: Router,
    ) {
        this.user = this.selectedUserService.get()
        if (!this.user) {
            this.router.navigate(['users'])
        }
    }

    ngOnInit() {
        this.title = `Update ${this.user.name}'s  Info `
    }

}
