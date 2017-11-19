import { GlobalValidatorsService } from '../../shared/services/global-validators.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { SnackBarService } from '../../shared/services/snackbar.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {
    form: FormGroup

    constructor(private fb: FormBuilder,
        private dataService: DataService,
        private sb: SnackBarService,
        private router: Router,
        private globalValidatorsService: GlobalValidatorsService
    ) {
    }

    ngOnInit() {
        this.buildForm()
    }

    private buildForm() {
        this.form = this.fb.group({
            email: ['', this.globalValidatorsService.mailFormat],
            password: ['', this.globalValidatorsService.passwordFormat],
        })
    }

    onSubmit(loginForm) {
        this.dataService.login(loginForm).subscribe(
            data => this.router.navigate(['/time']),
            error => this.sb.emitErrorSnackBar()
        )
    }


}
