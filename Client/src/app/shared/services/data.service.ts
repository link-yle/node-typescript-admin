import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { SnackBarService } from './snackbar.service';
import 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class DataService {
    private requestHeaders = new Headers({ 'Content-Type': 'application/json' });
    private requestOptions = new RequestOptions({ headers: this.requestHeaders });
    private donorsEndPoint

    constructor(private http: Http) {
        if (environment.production) this.donorsEndPoint = '/donors'
        else this.donorsEndPoint = 'http://localhost:3000/donors'
    }



    deleteUser(id) {
        return this.http.delete(`${this.donorsEndPoint}/users/${id}`)
            .map(res => {
                 return 'OK'
            })
            .catch(this.handleError);
    }

    deleteTimeZone(id) {
        return this.http.delete(`${this.donorsEndPoint}/timeZones/${id}`)
            .map(res => {
                 return 'OK'
            })
            .catch(this.handleError);
    }


    updateUser(id, data) {
        data._id = id
        return this.http.put(`${this.donorsEndPoint}/users/${id}`, data, this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(this.handleError);
    }

    signup(item) {
        return this.http.post(`${this.donorsEndPoint}`, item, this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(this.handleError);
    }

    login(item) {
        return this.http.post(`${this.donorsEndPoint}`, item, this.requestOptions)
            .map(res => {
                return res.json()
            })
            .catch(this.handleError);
    }

    getTimeZones(id) {
        return this.http.get(`${this.donorsEndPoint}/timeZones/${id}`)
            .map(res => {
                return res.json()
            })
            .catch(this.handleError);
    }

    getUsers(id) {
        return this.http.get(`${this.donorsEndPoint}/users/${id}`)
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


