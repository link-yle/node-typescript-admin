import { AuthService } from '../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model';

@Component({
    selector: 'app-edit-my-info',
    templateUrl: 'edit-my-info.component.html',
})
export class EditMyInfoComponent implements OnInit {
    public user: User
    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.user = this.authService.getProfile()
    }

    onEdited(e) {
        this.user.email = e.email
        this.user.name = e.name
        this.authService.saveProfile(this.user)
    }

}
