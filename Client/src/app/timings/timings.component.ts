import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { SnackBarService } from '../shared/services/snackbar.service';
import { Router } from '@angular/router';

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
        private router: Router
    ) {
    }

    ngOnInit() {
        this.getData()
    }

    private getData() {
        this.dataService.getTimeZones().subscribe(
            data => this.timeZones = data
        )
    }

    onDeleteClick(item) {
        this.dataService.deleteTimeZone(item.id).subscribe(
            data => this.getData(),
            error => this.sb.emitErrorSnackBar()
        )
    }


}
