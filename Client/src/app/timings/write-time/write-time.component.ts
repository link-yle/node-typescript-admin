import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataService } from '../../shared/services/data.service';
import { SnackBarService } from '../../shared/services/snackbar.service';
import { GlobalValidators } from '../../shared/services/global-validators.service';

@Component({
    selector: 'app-write-time',
    templateUrl: 'write-time.component.html',
    styleUrls: ['write-time.component.scss']
})
export class WriteTimeComponent {
    @Input() form: FormGroup
    @Output() submitted = new EventEmitter();
    constructor(
        private dataService: DataService,
        private sb: SnackBarService) {
    }

    onSubmit() {
        this.submitted.emit(this.form.value);
    }

}
