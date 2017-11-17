import { CommonModule } from '@angular/common';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { SignupComponent } from './signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    declarations: [
        SignupComponent,
    ],
    exports: [
        SignupComponent,
    ]
})
export class SignupModule {

}
