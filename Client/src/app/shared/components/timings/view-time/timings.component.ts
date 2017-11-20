import { DataService } from '../../../services/data.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
    @Output() addClicked = new EventEmitter()
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
            data => this.timeZones = data.timeZones,
            error => this.sb.emitErrorSnackBar(error)
        )
    }

    onDeleteClick(item) {
        this.dataService.deleteTimeZone(this.profileId, item._id).subscribe(
            data => this.getData(),
            error => this.sb.emitErrorSnackBar(error)
        )
    }

    onEditTimeClick() {
        // this.router.navigate(['/edit-time'])
    }

    onAddClick() {
        this.addClicked.emit()
    }

}
