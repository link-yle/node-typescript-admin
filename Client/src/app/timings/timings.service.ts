import { Injectable } from '@angular/core';
import { Timezone } from '../shared/models/timezone.model';

@Injectable()
export class TimingsService {

    private savedTiming: Timezone

    public saveSelectedTiming(timing: Timezone): void {
        this.savedTiming = timing;
    }

    public getSelectedTiming(): Timezone {
        return this.savedTiming
    }


}
