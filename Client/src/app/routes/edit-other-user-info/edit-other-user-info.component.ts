import { Component, OnInit } from '@angular/core';
import { SelectedUserService } from '../../shared/services/selectedUser.service';
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-edit-other-user-info',
    templateUrl: 'edit-other-user-info.component.html',
})
export class EditOtherUserInfoComponent implements OnInit {
    public user$: Observable<User>
    private userId: string
    public title: string
    constructor(
        private selectedUserService: SelectedUserService,
        private router: Router,
        private route: ActivatedRoute
    ) {

    }

    ngOnInit() {
        this.user$ = this.selectedUserService.getUserWithProbableDataFetch(this.route.params).do(data => {
            this.title = `Update ${data.name}'s  Info `
            this.userId = data._id
        })
    }

    navigateToChangeUserPassword() {
        this.router.navigate(['users', this.userId, 'password'])
    }

}
