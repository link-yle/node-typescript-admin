import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class ManagerClaimsService implements CanActivate {


    constructor(
        private authService: AuthService
    ) { }

    public canActivate(): boolean {
        const authorizedRoles = ['admin', 'manager']
        const profile = this.authService.getProfile()
        if (!profile || !authorizedRoles.includes(profile.role)) return false
        else return true
    }
}
