import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { SnackBarService } from '../../core/services/snackbar.service';
import { SelectedUserService } from 'app/core/services/selectedUser.service';
import { User } from 'app/shared/models/user.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordPattern } from 'app/shared/config/constants';

@Component({
    templateUrl: 'change-other-user-password.component.html',
})
export class ChangeOtherUserPasswordComponent implements OnInit {
    user: User
    form: FormGroup

    constructor(
        private dataService: DataService,
        private sb: SnackBarService,
        private selectedUserService: SelectedUserService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
    ) {  }

    ngOnInit() {
        this.buildForm()
        this.selectedUserService.getUserWithProbableDataFetch(this.route.params).first().subscribe(
            data => this.user = data,
            error =>  this.router.navigate(['users'])
        )
    }

    private buildForm() {
        this.form = this.fb.group({
            newPassword: ['', Validators.compose([Validators.required, Validators.pattern(passwordPattern)])],
            confirmPassword: ['', Validators.required],
        }, { validator: this.areEqual })
    }

    private areEqual(group) {
        return group.get('newPassword').value === group.get('confirmPassword').value ? null : { areEqual: true }
    }

    changePassword() {
        this.dataService.changeOtherUserPassword(this.user._id, this.form.value.newPassword).subscribe(
            data => {
                this.sb.emitSuccessSnackBar(`${this.user.name}'s password has been updated successfully`)
                this.buildForm()
            },
            error => {
                this.sb.emitErrorSnackBar(error)
                this.buildForm()
            }
        )
    }





}
