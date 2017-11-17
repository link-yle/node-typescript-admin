import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SnackBarService } from '../shared/services/snackbar.service';
import { DataService } from '../shared/services/data.service';
import { GlobalValidators } from '../shared/services/global-validators.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {
    form: FormGroup

    constructor(private fb: FormBuilder,
        private dataService: DataService,
        private sb: SnackBarService,
        private router: Router
    ) {
    }

    ngOnInit() {

    }

    buildForm() {
        this.form = this.fb.group({
            email: ['', GlobalValidators.mailFormat],
            password: ['', GlobalValidators.passwordFormat],
        })
    }

    onSubmit(loginForm) {
        this.dataService.login(loginForm).subscribe(
            data => this.router.navigate(['/time']),
            error => this.sb.emitErrorSnackBar()
        )
    }


}
