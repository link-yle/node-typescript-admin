import { Injectable } from '@angular/core';

@Injectable()
export class SnackBarService {

    private actionText = 'Ok'
    private successDefaultMessage = 'Successful operation'
    private errorDefaultMessage = 'Sorry, an error ocurred'

    constructor() { }

    emitSuccessSnackBar(message = this.successDefaultMessage, actionText = this.actionText) {

    }



    emitErrorSnackBar(message = this.errorDefaultMessage, actionText = this.actionText) {
        
    }

}
