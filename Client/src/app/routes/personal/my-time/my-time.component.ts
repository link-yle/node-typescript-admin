import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Timezone } from '../../../shared/models/timezone.model';
import { AuthService } from 'app/shared/services/auth.service';
import { DataService } from 'app/shared/services/data.service';
import { User } from 'app/shared/models/user.model';
import { SnackBarService } from 'app/shared/services/snackbar.service';
import { OnInit } from '@angular/core';

@Component({
    templateUrl: 'my-time.component.html',
})
export class MyTimeComponent implements OnInit {

    user: User
    constructor(
        private router: Router,
        private authService: AuthService,
        private dataService: DataService,
        private sb: SnackBarService,
    ) { }

    ngOnInit() {
        this.dataService.getUserDetails(this.authService.getId()).subscribe(
            data => this.user = data
        )
    }

    onAddClicked() {
        this.router.navigate(['/my-time/add'])
    }

    onEditClicked(item: Timezone) {
        this.router.navigate(['/my-time/edit'])
    }

    onDeleteClicked(item) {
        this.dataService.deleteTimeZone(this.user._id, item._id).subscribe(
            data => this.user.timeZones = this.user.timeZones.filter(t => t._id !== item._id),
            error => this.sb.emitErrorSnackBar(error)
        )
    }

}
