import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
    @Input() title: string
    @Output() edited = new EventEmitter()
    public form: FormGroup
    constructor(
        private dataService: DataService,
        private fb: FormBuilder,
        private sb: SnackBarService,
        private globalValidatorsService: GlobalValidatorsService
    ) { }

    ngOnInit() {
        // setTimeout(() => {
            this.buildForm()
        // }, 100)

    }

    private buildForm() {
        this.form = this.fb.group({
            name: [this.user.name, Validators.required],
            email: [this.user.email, this.globalValidatorsService.mailFormat],
        })
    }

    onSubmit() {
        const payload = { name: this.form.value.name, email: this.form.value.email }
        this.dataService.updateUserInfo(this.user._id, payload).subscribe(
            data => {
                this.sb.emitSuccessSnackBar()
                this.edited.emit(payload)
            },
            error => {
                this.sb.emitErrorSnackBar(error)
            }
        )
    }

}
