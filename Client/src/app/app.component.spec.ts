import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { NgProgressModule } from '@ngx-progressbar/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [NgProgressModule.forRoot(), RouterTestingModule]
    })
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
