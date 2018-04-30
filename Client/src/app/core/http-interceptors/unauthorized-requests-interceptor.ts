import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { SnackBarService } from 'app/core/services/snackbar.service';
import { Router } from '@angular/router';

@Injectable()
export class UnAuthorizedRequestsInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private sb: SnackBarService
    ) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).catch((res: HttpErrorResponse) => {
            const apiErrorMessage = res.error.msg
            if (res.status === 401 || res.status === 403) {
                this.sb.emitErrorSnackBar(apiErrorMessage);
                if (res.error.number === 1) {
                    this.router.navigate(['login/signup/activate'])
                } else {
                    this.router.navigate(['login'])
                }
                return Observable.of(null);
            } else {
                if (apiErrorMessage) {
                    return Observable.throw(apiErrorMessage);
                } else {
                    return Observable.throw('Sorry.. An error occurred')
                }
            }
        });
    }

    // private getMessage(res: HttpErrorResponse) {
    //     if (res.error instanceof Error) {
    //         return res.error.message ? res.error.message : res.error.toString()
    //     } else {
    //         return res.message ? res.message : res.toString();
    //     }
    // }

}
