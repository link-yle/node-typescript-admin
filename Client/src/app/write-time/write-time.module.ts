import { FormsModule } from '@angular/forms';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { WriteTimeComponent } from './write-time.component';

@NgModule({
    imports: [
        FormsModule
    ],
    declarations: [
        WriteTimeComponent,
    ],
    exports: [
        WriteTimeComponent,
    ]
})
export class WriteTimeModule {

}
