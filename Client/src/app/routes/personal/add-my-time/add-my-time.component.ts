import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { DataService } from 'app/shared/services/data.service';
import { SnackBarService } from 'app/shared/services/snackbar.service';
import { Timezone } from 'app/shared/models/timezone.model';

@Component({
    selector: 'app-add-my-time',
    templateUrl: 'add-my-time.component.html',
})
export class AddMyTimeComponent {

    constructor(
        private authService: AuthService,
        private router: Router,
        private dataService: DataService,
        private sb: SnackBarService,
    ) { 
        console.log('ad me time');
        
    }

    onSubmitted(x: Timezone) {
        this.dataService.addTimeZone(this.authService.getId(), x).subscribe(
            data => {
                this.authService.saveProfile(data)
                this.sb.emitSuccessSnackBar()
                this.router.navigate(['/my-time'])
            },
            error => this.sb.emitErrorSnackBar(error)
        )
    }

}
