import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { User } from '../../../models/user.model';
import { SnackBarService } from '../../../services/snackbar.service';
import { GlobalValidatorsService } from 'app/shared/services/global-validators.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-edit-user',
    templateUrl: 'edit-user.component.html',
})
export class EditUserComponent implements OnInit {
    @Input() user: User
    @Output() edited = new EventEmitter()
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
            name: [this.user.name, Validators.compose([Validators.required, Validators.max(20), Validators.min(3)])],
            email: [this.user.email, Validators.compose([Validators.required, Validators.email])],
        })
    }

    onSubmit() {
        const payload = { name: this.form.value.name, email: this.form.value.email }
        this.dataService.updateUserInfo(this.user._id, payload).subscribe(
            data => {
                this.sb.emitSuccessSnackBar()
                this.edited.emit(data)
            },
            error => {
                this.sb.emitErrorSnackBar(error)
            }
        )
    }

    isIncorrectPasswordFormat(control: string) {
        return this.form.get(control).hasError('incorrectPasswordFormat')
    }

    isIncorrectNameFormat(control: string) {
        return this.form.get(control).hasError('incorrectNameFormat')
    }

}
