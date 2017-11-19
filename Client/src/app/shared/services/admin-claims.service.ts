import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AdminClaimsService implements CanActivate {

    constructor(
        private authService: AuthService
    ) { }

    public canActivate(): boolean {
        const authorizedRoles = ['admin']
        if (authorizedRoles.includes(this.authService.getProfile().role)) return true
        else return false
    }
}
