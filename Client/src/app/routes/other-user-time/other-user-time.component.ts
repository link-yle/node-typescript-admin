import { Component, OnInit } from '@angular/core';
import { SelectedUserService } from '../../shared/services/selectedUser.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-other-user-time',
    templateUrl: 'other-user-time.component.html',
})
export class OtherUserTimeComponent implements OnInit {
    public profileId
    constructor(
        private selectedUserService: SelectedUserService,
        private router: Router
    ) { }

    ngOnInit() {
        this.profileId = this.selectedUserService.get()
    }
    // onAddClicked(){
    //     this.router.navigate(['/'])
    // }
}
