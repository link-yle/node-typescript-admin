import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { Component } from '@angular/core';
import { SelectedUserService } from '../../shared/services/selectedUser.service';
import { User } from '../../shared/models/user.model';

@Component({
    selector: 'app-edit-user',
    templateUrl: 'edit-user.component.html',
    styleUrls: ['edit-user.component.scss']
})
export class EditUserComponent {
    public selectedUser: User
    constructor(
        private dataService: DataService,
        private selectedUserService: SelectedUserService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.selectedUser =  this.selectedUserService.get()
        if(this.selectedUser) 
        this.route.params.forEach(params => {
            let userId = params["userId"];
            //call your function, like getUserInfo()
        })
    }



}
