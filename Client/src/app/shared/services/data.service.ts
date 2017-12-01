import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { SnackBarService } from './snackbar.service';
import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Timezone } from '../models/timezone.model';
import { UserCredentials } from '../models/userCredentials';
import { UserInfo } from '../models/userInfo.model';
import { Router } from '@angular/router';
@Injectable()
export class DataService {
    private requestOptions
    private usersEndPoint

    constructor
        (private http: Http, private authService: AuthService,
        private router: Router,
        private sb: SnackBarService
        ) {
        if (environment.production) this.usersEndPoint = '/users'
        else this.usersEndPoint = 'http://localhost:3000/users'
    }

    private setRequestOptions() {
        const requestHeaders = new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.authService.getToken()}`
        });
        this.requestOptions = new RequestOptions({ headers: requestHeaders });
    }

    login(item: UserCredentials) {
        return this.http.post(`${this.usersEndPoint}/login`, item, this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(err => this.handleError(err));
    }

    signup(item: User) {
        return this.http.post(`${this.usersEndPoint}`, item, this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(err => this.handleError(err));
    }


    updateUserInfo(id: string, data: UserInfo) {
        this.setRequestOptions()
        return this.http.put(`${this.usersEndPoint}/${id}/info`, data, this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(err => this.handleError(err));
    }


    deleteUser(id: string) {
        this.setRequestOptions()
        return this.http.delete(`${this.usersEndPoint}/${id}`, this.requestOptions)
            .map(res => {
                return 'OK'
            })
            .catch(err => this.handleError(err));
    }

    getUsers() {
        this.setRequestOptions()
        return this.http.get(`${this.usersEndPoint}/`, this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(err => this.handleError(err));
    }


    getUserDetails(userId: string) {
        this.setRequestOptions()
        return this.http.get(`${this.usersEndPoint}/${userId}`, this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(err => this.handleError(err));
    }



    updateTimeZone(userId: string, timeZoneId: string, data: Timezone) {
        this.setRequestOptions()
        return this.http.put(`${this.usersEndPoint}/${userId}/timezones/${timeZoneId}`, data, this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(err => this.handleError(err));
    }

    addTimeZone(userId: string, data: Timezone) {
        this.setRequestOptions()
        return this.http.post(`${this.usersEndPoint}/${userId}/timezones`, data, this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(err => this.handleError(err));
    }

    deleteTimeZone(userId: string, timeZoneId: string) {
        this.setRequestOptions()
        return this.http.delete(`${this.usersEndPoint}/${userId}/timezones/${timeZoneId}`, this.requestOptions)
            .map(res => {
                return 'OK'
            })
            .catch(err => this.handleError(err));
    }



    assignRole(id: string, data: { role: string }) {
        this.setRequestOptions()
        return this.http.patch(`${this.usersEndPoint}/${id}/role`, data, this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(err => this.handleError(err));
    }


    private handleError(error: Response | any) {
        console.log(error);
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        if (error.status === 403 || error.status === 401) {
            this.sb.emitErrorSnackBar(error)
            this.router.navigate(['login'])
        } else if (error.status === 422 && error.isJoi && error.details.length ) {
            error.details.forEach(err => this.sb.emitErrorSnackBar(err.message));
        }
        return Observable.throw(errMsg);
    }


}


