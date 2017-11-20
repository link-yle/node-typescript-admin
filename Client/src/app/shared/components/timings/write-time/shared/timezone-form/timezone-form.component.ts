import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../../../../services/data.service';
import { SnackBarService } from '../../../../../services/snackbar.service';
import { Timezone } from '../../../../../models/timezone.model';

@Component({
    selector: 'app-timezone-form',
    templateUrl: 'timezone-form.component.html',
})
export class TimeZoneFormComponent implements OnInit {
    form: FormGroup
    @Input() timeZone: Timezone
    @Output() submitted = new EventEmitter();

    constructor(
        private dataService: DataService,
        private fb: FormBuilder,
        private sb: SnackBarService) {
    }

    ngOnInit() {
        if (this.timeZone) this.buildForm()
    }
    onSubmit() {
        this.submitted.emit(this.form.value);
    }

    private buildForm() {
        this.form = this.fb.group({
            name: [this.timeZone.name, Validators.required],
            city: [this.timeZone.city, Validators.required],
            gmtTimeDifference: [this.timeZone.gmtTimeDifference, Validators.required],
        })
    }

}
