import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Timezone } from '../../../models/timezone.model';

@Component({
    selector: 'app-timezone-form',
    templateUrl: 'timezone-form.component.html',
})
export class TimeZoneFormComponent implements OnInit {
    form: FormGroup
    @Input() timeZone?: Timezone
    @Output() submitted = new EventEmitter();

    constructor(
        private fb: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.buildForm()
    }

    onSubmit() {
        this.submitted.emit(this.form.value);
    }

    private buildForm() {
        this.form = this.fb.group({
            name: [this.timeZone ? this.timeZone.name : '', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(3)])],
            city: [this.timeZone ? this.timeZone.city : '', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(3)])],
            gmtTimeDifference: [this.timeZone ? this.timeZone.gmtTimeDifference : 0, Validators.compose([Validators.required, Validators.max(14), Validators.min(-12)])],
        })
    }

}
