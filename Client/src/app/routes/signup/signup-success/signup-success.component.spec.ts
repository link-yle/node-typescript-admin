import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SignupSuccessComponent } from 'app/routes/signup/signup-success/signup-success.component';
import { LoginComponent } from 'app/routes/personal/login/login.component';
import { SharedModule } from 'app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';


describe('SignupSuccess Component', () => {

    let comp: SignupSuccessComponent;
    let fixture: ComponentFixture<SignupSuccessComponent>;
    let location: Location


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule,
                RouterTestingModule.withRoutes([{ path: 'login', component: LoginComponent }]),
            ],
            declarations: [SignupSuccessComponent, LoginComponent],
            providers: [Location],

        });
        fixture = TestBed.createComponent(SignupSuccessComponent);
        comp = fixture.componentInstance;

        location = fixture.debugElement.injector.get(Location);
    });

    it('should build successfully', () => {
        fixture.detectChanges();
        expect(comp).toBeTruthy()
    })

    xit('should navigate to "login" route when clicking on the link', fakeAsync(() => {
        fixture.nativeElement.querySelector('a').click();
        tick()
        expect(location.path()).toBe('')
    }))


})
