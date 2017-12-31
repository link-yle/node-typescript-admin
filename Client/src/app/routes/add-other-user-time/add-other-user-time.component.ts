import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectedUserService } from '../../shared/services/selectedUser.service';

@Component({
    selector: 'app-add-other-user-time',
    templateUrl: 'add-other-user-time.component.html',
})
export class AddOtherUserTimeComponent implements OnInit {
    profileId: string
    constructor(
        private selectedUserService: SelectedUserService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.selectedUserService.getUserWithProbableDataFetch(this.route.params).subscribe(
            user => this.profileId = user._id
        )
    }

    onAdded() {
        this.router.navigate(['/users/', this.profileId, 'time' ])
    }
}
