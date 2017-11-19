import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TimingsComponent } from './timings.component';
import { CommonModule } from '@angular/common';
import { TimingsRoutingModule } from 'app/timings/timings-routing.module';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        TimingsRoutingModule

    ],
    declarations: [
        TimingsComponent,
    ],
    exports: [
        TimingsComponent,
    ]
})
export class TimingsModule {

}
