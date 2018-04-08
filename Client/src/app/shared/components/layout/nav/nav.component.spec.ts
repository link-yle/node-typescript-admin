import { DebugElement, OnInit } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { NavComponent } from './nav.component';
import { DataService } from 'app/shared/services/data.service';
import { SharedModule } from 'app/shared/shared.module';
import { AuthService } from 'app/shared/services/auth.service';


describe('Nav Component', () => {

    let comp: NavComponent;
    let fixture: ComponentFixture<NavComponent>;
    let el: HTMLElement;
    let dataService: DataService
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, SharedModule],
            declarations: [],
            providers: [
                {provide: DataService, useValue: {}},
                {provide: AuthService, useValue: {}},
            ],
        });
        fixture = TestBed.createComponent(NavComponent);
        comp = fixture.componentInstance;
        dataService = fixture.debugElement.injector.get(DataService);
        el = fixture.debugElement.nativeElement
    });


    it('should load', () => {
        expect(comp).toBeTruthy()
    })


})
