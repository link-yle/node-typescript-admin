import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-edit-my-info',
    templateUrl: 'edit-my-info.component.html',
})
export class EditMyInfoComponent implements OnInit {
    public user$: Observable<User>
    public title: string
    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.title = `Update my Info `
        this.user$ = Observable.of(this.authService.getProfile())
    }

    onEdited(data: User) {
        this.authService.saveProfile(data)
    }

}
