import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TimingsComponent } from './timings.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule

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
