import { ComponentFixture, TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { AuthService } from 'app/core/services/auth.service';
import { Router } from '@angular/router';
import { AppModule } from 'app/app.module';
// tslint:disable-next-line:max-line-length
import { PasswordRecoveredSuccessfullyComponent } from 'app/routes/personal/recover-password-by-email/new-password-and-recovery-code-submission/password-recovered-successfully/password-recovered-successfully.component';

describe('passwordRecoveredSuccessfully Component', () => {
    let comp: PasswordRecoveredSuccessfullyComponent;
    let fixture: ComponentFixture<PasswordRecoveredSuccessfullyComponent>;
    let location: Location
    let authService: AuthService
    let router: Router;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AppModule],
            providers: [Location],
        })
        fixture = TestBed.createComponent(PasswordRecoveredSuccessfullyComponent)
        comp = fixture.componentInstance
        location = fixture.debugElement.injector.get(Location)
        authService = fixture.debugElement.injector.get(AuthService)
        authService.isAuthenticated = () => false
        router = TestBed.get(Router);
    })

    it('should get created', () => {
        fixture.detectChanges()
        expect(comp).toBeTruthy()
    })

    it('it should navigate to login route when link clicked', fakeAsync(() => {
        fixture.debugElement.nativeElement.querySelector('a').click()
        tick(100)
        expect(location.path()).toBe('/login')
    }))
})

