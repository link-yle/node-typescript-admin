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
@Injectable()
export class DataService {
    private requestOptions
    private usersEndPoint

    constructor(private http: Http, private authService: AuthService) {
        if (environment.production) this.usersEndPoint = '/users'
        else this.usersEndPoint = 'http://localhost:3000/users'
        this.setRequestOptions()
    }

    private setRequestOptions() {
        const requestHeaders = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.authService.getToken() });
        this.requestOptions = new RequestOptions({ headers: requestHeaders });
    }

    login(item: UserCredentials) {
        return this.http.post(`${this.usersEndPoint}/login`, item, this.requestOptions)
            .map(res => {
                this.authService.saveProfileAndToken(res.json().token, res.json().user)
                return res.json()
            })
            .catch(this.handleError);
    }

    signup(item: User) {
        return this.http.post(`${this.usersEndPoint}`, item, this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(this.handleError);
    }


    updateUserInfo(id: string, data: UserInfo) {
        return this.http.put(`${this.usersEndPoint}/users/${id}`, data, this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(this.handleError);
    }


    deleteUser(id: string) {
        return this.http.delete(`${this.usersEndPoint}/${id}`)
            .map(res => {
                return 'OK'
            })
            .catch(this.handleError);
    }

    getUsers() {
        return this.http.get(`${this.usersEndPoint}/users/`)
            .map(res => {
                return res.json()
            })
            .catch(this.handleError);
    }


    getUserDetails(userId: string) {
        return this.http.get(`${this.usersEndPoint}/users/${userId}`)
            .map(res => {
                return res.json()
            })
            .catch(this.handleError);
    }



    updateTimeZone(userId: string, timeZoneId: string, data: Timezone) {
        return this.http.put(`${this.usersEndPoint}/${userId}/timezones/${timeZoneId}`, data, this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(this.handleError);
    }

    addTimeZone(userId: string, data: Timezone) {
        return this.http.post(`${this.usersEndPoint}/${userId}/timezones`, data, this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(this.handleError);
    }

    deleteTimeZone(userId: string, timeZoneId: string) {
        return this.http.delete(`${this.usersEndPoint}/${userId}/timezones/${timeZoneId}`)
            .map(res => {
                return 'OK'
            })
            .catch(this.handleError);
    }



    assignRole(id: string, data: { role: string }) {
        return this.http.patch(`${this.usersEndPoint}/${id}/role`, data, this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(this.handleError);
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
        return Observable.throw(errMsg);
    }


}


