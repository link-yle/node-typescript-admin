import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

    public saveToken(token): void {
        window.localStorage.setItem('id_token', token)
    }

    public saveProfile(user: User) {
        window.localStorage.setItem(`role`, user.role)
        window.localStorage.setItem(`id`, user._id)
        window.localStorage.setItem(`profile`, JSON.stringify(user))
    }

    public getProfile() : User {
        return JSON.parse(window.localStorage.getItem('profile'))
    }

    public getToken() {
        return window.localStorage.getItem('id_token')
    }


    public getRole(): string {
        return window.localStorage.getItem('role')
    }


    public getId(): string {
        return window.localStorage.getItem('id')
    }

    public logout() {
        window.localStorage.removeItem('id_token')
        window.localStorage.removeItem('profile')
        window.localStorage.removeItem('role')
        window.localStorage.removeItem('id')
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('id_token');
        if (!token) return false
        const jwtHelper: JwtHelper = new JwtHelper();
        return !jwtHelper.isTokenExpired(token);
    }

    public isAtleastManager() {
        const role = this.getRole()
        if (role === 'admin' || role === 'manager') return true
        else return false
    }

}
