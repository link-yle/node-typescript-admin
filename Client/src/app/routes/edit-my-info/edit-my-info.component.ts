import { AuthService } from '../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-edit-my-info',
    templateUrl: 'edit-my-info.component.html',
    styleUrls: ['edit-my-info.component.scss']
})
export class EditMyInfoComponent implements OnInit {
    public profileId: string
    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.profileId = this.authService.getProfile()._id
    }

}
