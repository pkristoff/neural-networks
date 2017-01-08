///<reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
// let fs = require('fs');
// console.log(fs.readdirSync('.'))
// import '../node_modules/phaser/build/phaser.js';
// import '../../node_modules/phaser/build/phaser.js';
// import 'node_modules/phaser/build/phaser.js';

import {TicTacToe} from './ttt.component';


import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By}           from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
describe('2nd tests', () => {
    it('true is true', () => expect(true).toBe(true));
});

describe('TicTacToe', function () {
    let deCanvas: DebugElement;
    let deButton: DebugElement;
    let comp: TicTacToe;
    let fixture: ComponentFixture<TicTacToe>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [TicTacToe]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture  = TestBed.createComponent(TicTacToe);
        comp = fixture.componentInstance;
        deCanvas = fixture.debugElement.query(By.css('canvas'));
        deButton = fixture.debugElement.query(By.css('button'));
    });

    it('should create component', () => {
        expect(comp).toBeDefined();
        comp.create();
        expect(comp.playTicTacToe).toBeDefined();
    });

    it('should have playTicTacToe players & board defined', () => {
        comp.create();
        let playTicTacToe = comp.playTicTacToe;
        expect(playTicTacToe).toBeDefined();
        expect(playTicTacToe.player1).toBeDefined();
        expect(playTicTacToe.player2).toBeDefined();
        expect(playTicTacToe.player1).not.toBe(playTicTacToe.player2);
        expect(playTicTacToe.board).toBeDefined();
    });

    it('should have canvas defined and button defined', () => {
        const canvas = deCanvas.nativeElement;
        expect(canvas).toBeDefined();
        const button = deButton.nativeElement;
        expect(button).toBeDefined();
        expect(button.innerText).toMatch('Play again');
    });
});
