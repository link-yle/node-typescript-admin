import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

@Injectable()
export class AuthService {
    refreshSubscription: any;
    private profile
    private token
    constructor(public router: Router, private http: Http) { }


    private setSession(profile): void {
        localStorage.setItem('expiry', profile.expiry);
    }

    public getProfile() {
        return this.http.get(this.userDetailsUrl)
            .map(res => {
                this.profile = res.json()
                this.setSession(this.profile)
                return this.profile
            })
            .catch(this.handleError);
    }

    public getToken() {
        return this.http.get(this.tokenUrl)
            .map(res => {
                this.token = res.text()
                window.localStorage.setItem("access_token", this.token)
                return this.token
            })
            .catch(this.handleError);
    }

    public isAuthenticated(): boolean {
        if (!localStorage.getItem('expiry')) return false
        return new Date().getTime() / 1000 < JSON.parse(localStorage.getItem('expiry'))
    }



    private handleError(error: Response | any) {
        const errMsg = 'ds';
        // if (error instanceof Response) {
        // 	const body = error.json() || '';
        // 	const err = body || JSON.stringify(body);
        // 	errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        // } else {
        // 	errMsg = error.message ? error.message : error.toString();
        // }
        // console.error(error);
        return Observable.throw(errMsg);
    }





}
