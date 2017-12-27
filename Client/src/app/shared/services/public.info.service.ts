import { Injectable } from '@angular/core';

@Injectable()
export class PublicInfoService {

    private email: string
    private pass: string

    public setEmail(email): void {
        this.email = email;
    }

    public getEmail(): string {
        return this.email
    }

    public setPass(Pass): void {
        this.pass = Pass;
    }

    public getPass(): string {
        return this.pass
    }


}
