import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../shared/services/data.service';
import { SnackBarService } from '../shared/services/snackbar.service';
import { GlobalValidators } from '../shared/services/global-validators.service';

@Component({
    selector: 'app-write-time',
    templateUrl: 'write-time.component.html',
    styleUrls: ['write-time.component.scss']
})
export class WriteTimeComponent implements OnInit {
    form: FormGroup
    constructor(private fb: FormBuilder,
        private dataService: DataService,
        private sb: SnackBarService) {
    }
    ngOnInit() {
        this.buildForm()
    }

    private buildForm() {
        this.form = this.fb.group({
            name: ['', Validators.required],
            city: ['', Validators.required],
            gmtTimeDifference: ['', Validators.required],
        })
    }

    

}
