import { Component, OnInit } from '@angular/core';
import { SelectedUserService } from '../../shared/services/selectedUser.service';
import { Router } from '@angular/router';
import { Timezone } from '../../shared/models/timezone.model';
import { ActivatedRoute } from '@angular/router';
import { User } from 'app/shared/models/user.model';
import { SnackBarService } from 'app/shared/services/snackbar.service';
import { DataService } from 'app/shared/services/data.service';

@Component({
    templateUrl: 'other-user-time.component.html',
})
export class OtherUserTimeComponent implements OnInit {
    public user: User
    constructor(
        private selectedUserService: SelectedUserService,
        private router: Router,
        private route: ActivatedRoute,
        private sb: SnackBarService,
        private dataService: DataService,
    ) {
     }

    ngOnInit() {
        this.route.params.first().flatMap(data => this.dataService.getUserDetails(data.id).first()).subscribe(
            data =>  this.user = data,
            error => this.sb.emitErrorSnackBar(error)
        )
    }

    onDeleteClicked(item) {
        this.dataService.deleteTimeZone(this.user._id, item._id).subscribe(
            data => this.user.timeZones = this.user.timeZones.filter(t => t._id !== item._id),
            error => this.sb.emitErrorSnackBar(error)
        )
    }


    onAddClicked() {
        this.router.navigate(['users', this.user._id, 'time', 'add'])
    }

    onEditClicked(item: Timezone) {
        this.router.navigate(['users', this.user._id, 'time', 'edit'])
    }

    title() {
        return `${this.user.name}'s Timings`
    }

}
