import { SnackBarService } from '../../../shared/services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: 'forgotten-password-process.component.html',
})
export class ForgottenPasswordProcessComponent implements OnInit {

    code: string
    email: string

    constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private router: Router,
        private sb: SnackBarService,
    ) {

    }
    ngOnInit() {
        this.route.queryParams.subscribe((params => {
            this.code = params['code']
            this.email = params['email']
            if (!this.email || !this.code) this.router.navigate(['/login/corrupt'])
        }))
    }

    private recoverFromBackEnd(obj: {recoveryCode: string, email: string, newPassword: string}) {
        this.dataService.changeMyPasswordUsingRecoveryCode(obj).subscribe(
            data => {
                this.router.navigate(['/login/forgotten_password_process/success'])
            },
            () => this.sb.emitErrorSnackBar('An error occurred. Please try again later')
        )
    }

    changePassword(e) {
        this.recoverFromBackEnd({ recoveryCode: this.code, email: this.email, newPassword: e.newPassword})
    }

}

