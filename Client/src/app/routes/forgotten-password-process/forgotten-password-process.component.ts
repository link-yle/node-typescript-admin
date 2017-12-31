
import { SnackBarService } from '../../shared/services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'forgotten-password-process',
    templateUrl: 'forgotten-password-process.component.html',
})
export class ForgottenPasswordProcessComponent implements OnInit {

    isSuccess: boolean
    isCorrupt: boolean
    constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private sb: SnackBarService,
    ) {

    }
    ngOnInit() {
        this.route.queryParams.subscribe((params => {
            const code = params['code']
            const email = params['email']
            if (!email || !code) this.isCorrupt = true
            else this.activateFromBackEnd(code, email)
        }))
    }

    activateFromBackEnd(code, email) {
        console.log(code, email);
        this.dataService.activateFromBackEnd(code, email).subscribe(
            data => {
                this.isSuccess = true;
            },
            () => this.sb.emitErrorSnackBar('An error occurred. Please try again later')
        )
    }

}

