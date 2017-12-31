import { Component, OnInit } from '@angular/core';
import { SelectedUserService } from '../../shared/services/selectedUser.service';
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
    templateUrl: 'edit-other-user-info.component.html',
})
export class EditOtherUserInfoComponent implements OnInit {
    public user: User
    constructor(
        private selectedUserService: SelectedUserService,
        private router: Router,
        private route: ActivatedRoute
    ) {

    }

    ngOnInit() {
        this.selectedUserService.getUserWithProbableDataFetch(this.route.params).first().subscribe(data =>  this.user = data )
    }

    navigateToChangeUserPassword() {
        this.router.navigate(['users', this.user._id, 'password'])
    }

}
