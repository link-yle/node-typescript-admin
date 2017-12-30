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
    private endPoint

    constructor
        (private http: Http, private authService: AuthService,
        private router: Router,
        private sb: SnackBarService
        ) {
        if (environment.production) this.endPoint = '/'
        else this.endPoint = 'http://localhost:3000'
    }

    private setRequestOptions() {
        const requestHeaders = new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.authService.getToken()}`
        });
        this.requestOptions = new RequestOptions({ headers: requestHeaders });
    }

    login(item: UserCredentials) {
        return this.http.post(`${this.endPoint}/users/login`, item, this.requestOptions)
            .map(res => {
                return res.json()
            })
    }

    signup(item: User) {
        return this.http.post(`${this.endPoint}/users`, { email: item.email, password: item.password, timeZones: [], name: item.name },
            this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(err => this.handleError(err));
    }

    signupSecurely(item: User, route) {
        return this.http.post(`${this.endPoint}/users/secure`, {
            user: {
                email: item.email, password: item.password, timeZones: [], name: item.name
            },
            route: `${window.location.origin}/login/activation_link`
        }, this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(err => this.handleError(err));
    }

    activateFromBackEnd(code, email) {
        return this.http.get(`${this.endPoint}/activation?code=${code}&email=${email}`, this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(err => this.handleError(err));
    }

    // activateFromBackEnd(code, email) {
    //     return this.http.get(`${this.endPoint}/activation?code=${code}&email=${email}`, this.requestOptions)
    //         .map(res => {
    //             return res.json()
    //         })
    //         .catch(err => this.handleError(err));
    // }


    updateUserInfo(id: string, data: UserInfo) {
        this.setRequestOptions()
        return this.http.put(`${this.endPoint}/users/${id}/info`, data, this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(err => this.handleError(err));
    }


    deleteUser(id: string) {
        this.setRequestOptions()
        return this.http.delete(`${this.endPoint}/users/${id}`, this.requestOptions)
            .map(res => {
                return 'OK'
            })
            .catch(err => this.handleError(err));
    }

    getUsers({ skip = 0, searchTerm = '' }) {
        console.log(skip, searchTerm);
        this.setRequestOptions()
        return this.http.get(`${this.endPoint}/users?skip=${skip}&filter=${searchTerm}`, this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(err => this.handleError(err));
    }


    getUserDetails(userId: string) {
        this.setRequestOptions()
        return this.http.get(`${this.endPoint}/users/${userId}`, this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(err => this.handleError(err));
    }



    updateTimeZone(userId: string, timeZoneId: string, data: Timezone) {
        this.setRequestOptions()
        return this.http.put(`${this.endPoint}/users/${userId}/timezones/${timeZoneId}`, data, this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(err => this.handleError(err));
    }

    addTimeZone(userId: string, data: Timezone) {
        this.setRequestOptions()
        return this.http.post(`${this.endPoint}/users/${userId}/timezones`, data, this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(err => this.handleError(err));
    }

    deleteTimeZone(userId: string, timeZoneId: string) {
        this.setRequestOptions()
        return this.http.delete(`${this.endPoint}/users/${userId}/timezones/${timeZoneId}`, this.requestOptions)
            .map(res => {
                return 'OK'
            })
            .catch(err => this.handleError(err));
    }



    assignRole(id: string, data: { role: string }) {
        this.setRequestOptions()
        return this.http.patch(`${this.endPoint}/users/${id}/role`, data, this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(err => this.handleError(err));
    }

    forgottenPassword(email, route) {
        return this.http.post(`${this.endPoint}/password_recovery_requests`, { email, route }, this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(err => this.handleError(err));
    }

    changePasswordUsingOldPassword(id: string, { oldPassword, newPassword }: { oldPassword: string, newPassword: string }) {
        this.setRequestOptions()
        return this.http.put(`${this.endPoint}/users/${id}/password`, { oldPassword, newPassword }, this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(err => this.handleError(err));
    }




    private handleError(error: Response | any) {
        console.log(error);
        let message: string;
        let statusCode: number;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            statusCode = error.status
            message = err;
        } else {
            message = error.message ? error.message : error.toString();
        }
        console.error(message);
        if (error.status === 403 || error.status === 401) {
            this.sb.emitErrorSnackBar(error)
            this.router.navigate(['login'])
        }
        return Observable.throw(message);
    }





}


