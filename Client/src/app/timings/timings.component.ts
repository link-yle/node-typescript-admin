import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { SnackBarService } from '../shared/services/snackbar.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-timings',
    templateUrl: 'timings.component.html',
    styleUrls: ['timings.component.scss']
})

export class TimingsComponent implements OnInit {
    timeZones = []
    constructor(
        private dataService: DataService,
        private sb: SnackBarService,
        private router: Router,
        private authService: AuthService

    ) {
    }

    ngOnInit() {
        this.getData()
    }

    private getData() {
        this.dataService.getUserDetails(this.authService.getProfile()._id).subscribe(
            data => this.timeZones = data,
            error => this.sb.emitErrorSnackBar()
        )
    }

    onDeleteClick(item) {
        this.dataService.deleteTimeZone(this.authService.getProfile()._id, item._id).subscribe(
            data => this.getData(),
            error => this.sb.emitErrorSnackBar()
        )
    }


}
