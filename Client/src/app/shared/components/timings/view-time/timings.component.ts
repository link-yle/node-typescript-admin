import { DataService } from '../../../services/data.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBarService } from '../../../services/snackbar.service';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-timings',
    templateUrl: 'timings.component.html',
    styleUrls: ['timings.component.scss']
})

export class TimingsComponent implements OnInit {
    timeZones = []
    @Input() profileId: string
    constructor(
        private dataService: DataService,
        private sb: SnackBarService,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.getData()
    }

    private getData() {
        this.dataService.getUserDetails(this.profileId).subscribe(
            data => this.timeZones = data,
            error => this.sb.emitErrorSnackBar()
        )
    }

    onDeleteClick(item) {
        this.dataService.deleteTimeZone(this.profileId, item._id).subscribe(
            data => this.getData(),
            error => this.sb.emitErrorSnackBar()
        )
    }


}
