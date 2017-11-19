import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt'

@Injectable()
export class TokenExpiryService implements CanActivate {

    private jwtHelper = new JwtHelper();
    constructor(
        private router: Router
    ) { }

    public canActivate(): boolean {
        if (this.jwtHelper.isTokenExpired) {
            this.router.navigate(['/home']);
            return false;
        }
        return true;
    }


}
