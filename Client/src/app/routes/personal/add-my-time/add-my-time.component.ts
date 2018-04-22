import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { DataService } from 'app/core/services/data.service';
import { SnackBarService } from 'app/core/services/snackbar.service';
import { Timezone } from 'app/shared/models/timezone.model';

@Component({
    templateUrl: 'add-my-time.component.html',
})
export class AddMyTimeComponent {

    constructor(
        private authService: AuthService,
        private router: Router,
        private dataService: DataService,
        private sb: SnackBarService,
    ) {  }

    onSubmitted(x: Timezone) {
        this.dataService.addTimeZone(this.authService.getId(), x).subscribe(
            data => {
                this.sb.emitSuccessSnackBar()
                this.router.navigate(['/my-time'])
            },
            error => this.sb.emitErrorSnackBar(error)
        )
    }

}
