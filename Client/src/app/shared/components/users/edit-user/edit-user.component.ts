import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { SelectedUserService } from '../../../services/selectedUser.service';
import { User } from '../../../models/user.model';
import { SnackBarService } from '../../../services/snackbar.service';
import { GlobalValidatorsService } from 'app/shared/services/global-validators.service';

@Component({
    selector: 'app-edit-user',
    templateUrl: 'edit-user.component.html',
    styleUrls: ['edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
    @Input() user: User
    public form: FormGroup
    constructor(
        private dataService: DataService,
        private fb: FormBuilder,
        private sb: SnackBarService,
        private globalValidatorsService: GlobalValidatorsService
    ) { }

    ngOnInit() {
        this.buildForm()
    }

    private buildForm() {
        this.form = this.fb.group({
            name: [this.user.name, Validators.required],
            email: [this.user.email, this.globalValidatorsService.mailFormat],
        })
    }

    onSubmit() {
        this.dataService.updateUserInfo(this.user._id, { name: this.user.name, email: this.user.email }).subscribe(
            data => this.sb.emitSuccessSnackBar(),
            error => this.sb.emitErrorSnackBar(error)
        )
    }

}
