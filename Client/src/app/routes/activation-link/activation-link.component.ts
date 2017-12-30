import { SnackBarService } from '../../shared/services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-activation-link',
    templateUrl: 'activation-link.component.html',
})
export class ActivationLinkComponent implements OnInit {

    loading = true

    constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private router: Router,
        private sb: SnackBarService,
    ) {

    }
    ngOnInit() {
        this.route.queryParams.subscribe((params => {
            const code = params['code']
            const email = params['email']
            if (!email || !code) this.router.navigate(['login/activation_link/corrupt'])
            else this.activateFromBackEnd(code, email)
        }))
    }

    activateFromBackEnd(code, email) {
        console.log(code, email);
        this.dataService.activateFromBackEnd(code, email).subscribe(
            data => {
                this.sb.emitSuccessSnackBar('Your account has been successfully activated')
                this.router.navigate(['login/activation_link/success'])
            },
            () => this.sb.emitErrorSnackBar('An error occurred. Please try again later')
        )
    }

}
