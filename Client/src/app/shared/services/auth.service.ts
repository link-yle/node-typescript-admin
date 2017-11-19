import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {

    public saveProfileAndToken(token, user): void {
        window.localStorage.setItem(`profile`, JSON.stringify(user))
        window.localStorage.setItem('id_token', token)
    }

    public getToken() {
        return window.localStorage.getItem('id_token')
    }

    public getProfile(): User {
        const profile = window.localStorage.getItem('profile')
        return JSON.parse(profile)
    }

    public logout() {
        window.localStorage.removeItem('id_token')
        window.localStorage.removeItem('profile')
    }

}
