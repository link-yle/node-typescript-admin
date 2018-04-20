import { Injectable } from '@angular/core';
import { HttpInterceptor , HttpRequest , HttpHeaders , HttpHandler } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable()
export class EnvironmentApiInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any> , next: HttpHandler) {
        const host = environment.apiUrl || '/';
        req = req.clone({
            url: host + req.url
        });
        return next.handle(req);
    }

}
