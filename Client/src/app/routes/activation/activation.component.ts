import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { switchMap } from 'rxjs/operators'


import { GlobalValidatorsService } from '../../shared/services/global-validators.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../shared/services/data.service';
import { SnackBarService } from '../../shared/services/snackbar.service';
import { PublicInfoService } from 'app/shared/services/public.info.service';

@Component({
    selector: 'app-activation',
    templateUrl: 'activation.component.html',
})
export class ActivationComponent implements OnInit {

    form: FormGroup

    constructor(private fb: FormBuilder,
        private dataService: DataService,
        private sb: SnackBarService,
        private router: Router,
        private globalValidatorsService: GlobalValidatorsService,
        private publicInfoService: PublicInfoService
    ) {
    }
    ngOnInit() {
        this.buildForm()
    }


    private buildForm() {
        this.form = this.fb.group({
            code: ['', Validators.compose([Validators.required, this.globalValidatorsService.activationCodeFormat])],
            email: [this.publicInfoService.getEmail() || '',
            Validators.compose([Validators.required, this.globalValidatorsService.activationCodeFormat])],
        })
    }

    public submitCode() {
        this.dataService.sendActivationCode(this.form.value.code, this.form.value.email)
        .pipe(switchMap(  () => this.dataService.login({ email: this.form.value.email, password: this.publicInfoService.getPass() })))
        .catch((e) => Observable.throw(e))
            .subscribe(
            data => this.router.navigate(['/']),
            error => {
                this.sb.emitErrorSnackBar(error)
            })
    }

    isInCorrectCodeFormat(control: string) {
        return this.form.get(control).hasError('inCorrectCodeFormat')
    }

    // isIncorrectMailFormat(control: string) {
    //     return this.form.get(control).hasError('incorrectMailFormat')
    // }




}







