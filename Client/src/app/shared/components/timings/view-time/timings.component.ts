import { Timezone } from '../../../models/timezone.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TimingsService } from 'app/shared/services/timings.service';

@Component({
    selector: 'app-timings',
    templateUrl: 'timings.component.html',
})

export class TimingsComponent {
    @Input() timeZones: Timezone[]
    @Input() title: string
    @Output() addClicked = new EventEmitter()
    @Output() editClicked = new EventEmitter()
    @Output() deleteClicked = new EventEmitter()
  
    constructor(
        private timingsService: TimingsService,
    ) { }



    onDeleteClick(item) {
        this.deleteClicked.emit(item)
    }

    onEditTimeClick(item: Timezone) {
        this.timingsService.saveSelectedTiming(item)
        this.editClicked.emit(item)
    }

    onAddClick() {
        this.addClicked.emit()
    }

    getTime(gmtTimeDifference) {
        const t = new Date()
        t.setHours(t.getHours() + gmtTimeDifference)
        return `${t.getHours()}: ${t.getMinutes()}`
    }

}
