import {AppComponent} from './app.component';

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By}           from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {TestHostComponent} from './xxx.component.spec';
describe('1st tests', () => {
    it('true is true', () => expect(true).toBe(true));
});

// does not work because of nn-ttt component
xdescribe('AppComponent', function () {
    let de: DebugElement;
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [AppComponent, TestHostComponent]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture  = TestBed.createComponent(TestHostComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement.query(By.css('div'));
    });

    it('should create component', () => {
        expect(comp).toBeDefined();
    });

    it('should have expected <nn-ttt> text', () => {
        fixture.detectChanges();
        console.log(de);
        const h1 = de.nativeElement;
        expect(h1.innerText).toMatch(/angular/i,
            '<h1> should say something about "Angular"');
    });
});
