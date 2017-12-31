import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { SelectedUserService } from '../../../services/selectedUser.service';
import { User } from '../../../models/user.model';
import { SnackBarService } from '../../../services/snackbar.service';
import { GlobalValidatorsService } from 'app/shared/services/global-validators.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-edit-user',
    templateUrl: 'edit-user.component.html',
    styleUrls: ['edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
    @Input() user$: Observable<User>
    @Input() title: string
    @Output() edited = new EventEmitter()
    private userId: string
    public form: FormGroup
    constructor(
        private dataService: DataService,
        private fb: FormBuilder,
        private sb: SnackBarService,
        private globalValidatorsService: GlobalValidatorsService
    ) { }

    ngOnInit() {
        this.user$.subscribe(data=>{
            this.userId = data._id
            this.buildForm(data)
        })
   

    }

    private buildForm(user) {
        this.form = this.fb.group({
            name: [user.name, Validators.compose([Validators.required, this.globalValidatorsService.nameFormat])],
            email: [user.email, Validators.compose([Validators.required, this.globalValidatorsService.mailFormat])],
        })
    }

    onSubmit() {
        const payload = { name: this.form.value.name, email: this.form.value.email }
        this.dataService.updateUserInfo(this.userId, payload).subscribe(
            data => {
                this.sb.emitSuccessSnackBar()
                this.edited.emit(payload)
            },
            error => {
                this.sb.emitErrorSnackBar(error)
            }
        )
    }

    isIncorrectMailFormat(control: string) {
        return this.form.get(control).hasError('incorrectMailFormat')
    }

    isIncorrectPasswordFormat(control: string) {
        return this.form.get(control).hasError('incorrectPasswordFormat')
    }

    isIncorrectNameFormat(control: string) {
        return this.form.get(control).hasError('incorrectNameFormat')
    }

}
