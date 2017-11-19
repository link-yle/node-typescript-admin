import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {

    public saveProfileAndToken(token, user): void {
        window.localStorage.setItem(`profile`, JSON.stringify(user))
        window.localStorage.setItem('access_token', token)
    }

    public getToken() {
        return window.localStorage.getItem('access_token')
    }

    public getProfile(): User {
        const profile = window.localStorage.getItem('profile')
        return JSON.parse(profile)
    }

    public logout() {
        window.localStorage.removeItem('access_token')
        window.localStorage.removeItem('profile')
    }

}
