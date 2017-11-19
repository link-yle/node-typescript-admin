import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt'
import { AuthService } from './auth.service';

@Injectable()
export class TokenExpiryService implements CanActivate {

    private jwtHelper = new JwtHelper();
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    public canActivate(): boolean {
        if (this.jwtHelper.isTokenExpired(this.authService.getToken())) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }


}
