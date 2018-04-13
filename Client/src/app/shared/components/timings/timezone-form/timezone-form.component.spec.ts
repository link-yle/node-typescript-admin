import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { TimeZoneFormComponent } from 'app/shared/components/timings/timezone-form/timezone-form.component';
import { SharedModule } from 'app/shared/shared.module';
import { By } from '@angular/platform-browser';

describe('TimeZoneFormComponentt', () => {
    let comp: TimeZoneFormComponent;
    let fixture: ComponentFixture<TimeZoneFormComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule]
        });
        fixture = TestBed.createComponent(TimeZoneFormComponent);
        comp = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should build successfully', () => {
        expect(comp).toBeTruthy()
    })

    describe('Form validation', () => {
        describe('invalid name', () => {
            beforeEach(() => {
                const nameInput = fixture.debugElement.query(By.css('input[name="name"]'));
                const nameInputElement = nameInput.nativeElement
                nameInputElement.value = 'nn'
                nameInputElement.dispatchEvent(new Event('input'));
                const city = fixture.debugElement.query(By.css('input[name="city"]'));
                const cityElement = city.nativeElement
                cityElement.value = 'cccc'
                cityElement.dispatchEvent(new Event('input'));
                const gmtTimeDifference = fixture.debugElement.query(By.css('input[name="gmtTimeDifference"]'));
                const gmtTimeDifferenceElement = gmtTimeDifference.nativeElement
                gmtTimeDifferenceElement.value = '3'
                gmtTimeDifferenceElement.dispatchEvent(new Event('input'));
                fixture.detectChanges()
            })
            it('form should be invalid', () => {
                expect(comp.form.invalid).toBe(true)
            })
            it('submit button should be disabled', () => {
                expect(fixture.nativeElement.querySelector('button[type="submit"][disabled]')).toBeTruthy()
            })
        })

        describe('invalid city', () => {
            beforeEach(() => {
                const nameInput = fixture.debugElement.query(By.css('input[name="name"]'));
                const nameInputElement = nameInput.nativeElement
                nameInputElement.value = 'nnnn'
                nameInputElement.dispatchEvent(new Event('input'));
                const city = fixture.debugElement.query(By.css('input[name="city"]'));
                const cityElement = city.nativeElement
                cityElement.value = 'cc'
                cityElement.dispatchEvent(new Event('input'));
                const gmtTimeDifference = fixture.debugElement.query(By.css('input[name="gmtTimeDifference"]'));
                const gmtTimeDifferenceElement = gmtTimeDifference.nativeElement
                gmtTimeDifferenceElement.value = '3'
                gmtTimeDifferenceElement.dispatchEvent(new Event('input'));
                fixture.detectChanges()
            })
            it('form should be invalid', () => {
                expect(comp.form.invalid).toBe(true)
            })
            it('submit button should be disabled', () => {
                expect(fixture.nativeElement.querySelector('button[type="submit"][disabled]')).toBeTruthy()
            })
        })

        describe('gmtTimeDifference validation', () => {
            beforeEach(() => {
                const nameInput = fixture.debugElement.query(By.css('input[name="name"]'));
                const nameInputElement = nameInput.nativeElement
                nameInputElement.value = 'nnnn'
                nameInputElement.dispatchEvent(new Event('input'));
                const city = fixture.debugElement.query(By.css('input[name="city"]'));
                const cityElement = city.nativeElement
                cityElement.value = 'cccc'
                cityElement.dispatchEvent(new Event('input'));
            })

            describe('too high', () => {
                beforeEach(() => {
                    const gmtTimeDifference = fixture.debugElement.query(By.css('input[name="gmtTimeDifference"]'));
                    const gmtTimeDifferenceElement = gmtTimeDifference.nativeElement
                    gmtTimeDifferenceElement.value = '15'
                    gmtTimeDifferenceElement.dispatchEvent(new Event('input'));
                    fixture.detectChanges()
                })
                it('form should be invalid', () => {
                    expect(comp.form.invalid).toBe(true)
                })
                it('submit button should be disabled', () => {
                    expect(fixture.nativeElement.querySelector('button[type="submit"][disabled]')).toBeTruthy()
                })
            })

            describe('too low', () => {
                beforeEach(() => {
                    const gmtTimeDifference = fixture.debugElement.query(By.css('input[name="gmtTimeDifference"]'));
                    const gmtTimeDifferenceElement = gmtTimeDifference.nativeElement
                    gmtTimeDifferenceElement.value = '-13'
                    gmtTimeDifferenceElement.dispatchEvent(new Event('input'));
                    fixture.detectChanges()
                })
                it('form should be invalid', () => {
                    expect(comp.form.invalid).toBe(true)
                })
                it('submit button should be disabled', () => {
                    expect(fixture.nativeElement.querySelector('button[type="submit"][disabled]')).toBeTruthy()
                })
            })

            describe('just in range', () => {
                beforeEach(() => {
                    const gmtTimeDifference = fixture.debugElement.query(By.css('input[name="gmtTimeDifference"]'));
                    const gmtTimeDifferenceElement = gmtTimeDifference.nativeElement
                    gmtTimeDifferenceElement.value = '-12'
                    gmtTimeDifferenceElement.dispatchEvent(new Event('input'));
                    fixture.detectChanges()
                })
                it('form should be invalid', () => {
                    expect(comp.form.invalid).toBe(false)
                })
                it('submit button should be disabled', () => {
                    expect(fixture.nativeElement.querySelector('button[type="submit"][disabled]')).toBeFalsy()
                })
            })

        })
    })

})
