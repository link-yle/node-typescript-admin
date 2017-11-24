import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

    public saveToken(token): void {
        window.localStorage.setItem('id_token', token)
    }

    public saveProfile(user) {
        window.localStorage.setItem(`profile`, JSON.stringify(user))
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

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('id_token');
        if (!token) return false
        const jwtHelper: JwtHelper = new JwtHelper();
        return !jwtHelper.isTokenExpired(token);
    }

    public isAtleastManager() {
        const user = this.getProfile()
        if (!user) return false
        else if (user.role === 'admin' || user.role === 'manager') return true
        else return false
    }

}
