import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { ActivatedRoute } from '@angular/router/src/router_state';
import { Observable } from 'rxjs/Observable';
import { DataService } from 'app/shared/services/data.service';

@Injectable()
export class SelectedUserService {

    private selectedUser: User

    constructor(
        private dataService: DataService
    ) { }
    public set(user: User): void {
        this.selectedUser = user;
    }

    public get(): User {
        return this.selectedUser
    }

    public getUserWithProbableDataFetch(params: Observable<any>) {
        if (this.selectedUser) return Observable.of(this.selectedUser)
        else return params.first().switchMap(data => this.dataService.getUserDetails(data.id).first().do(user=> this.selectedUser = user))
    }


}
