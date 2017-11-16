import { MdSnackBar, MdSnackBarConfig,  } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class SnackBarService {

    private actionText = 'Ok'
    private successDefaultMessage = 'Successful operation'
    private successConfig = { extraClasses: ['successAlert'], duration: 5000 }
    private errorDefaultMessage = 'Sorry, an error ocurred'
    private errorConfig = { extraClasses: ['errorAlert'], duration: 5000 }

    constructor(private snackBar: MdSnackBar) { }

    emitSuccessSnackBar(message = this.successDefaultMessage, actionText = this.actionText, config = this.successConfig) {
        this.snackBar.open(message, actionText, config)
    }



    emitErrorSnackBar(message = this.errorDefaultMessage, actionText = this.actionText, config = this.errorConfig) {
        this.snackBar.open(message, actionText, config)
    }

}
