import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable()
export class SelectedUserService {

    private selectedUser: User

    public set(user: User): void {
        this.selectedUser = user;
    }

    public get(): User {
        return this.selectedUser
    }


}
