import {TicTacToe, MultirunInfo} from './ttt.component';


import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By}           from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {PlayTicTacToe} from './playTicTacToe';
describe('2nd tests', () => {
    it('true is true', () => expect(true).toBe(true));
});

describe('TicTacToe', function () {
    let deCanvas: DebugElement;
    let deButton: DebugElement;
    let comp: TicTacToe;
    let fixture: ComponentFixture<TicTacToe>;
    let rrMultirunInfo = new MultirunInfo(1, 1, 1);
    let nrMultirunInfo = new MultirunInfo(1, 1, 1);
    let rnMultirunInfo = new MultirunInfo(1, 1, 1);
    let nnMultirunInfo = new MultirunInfo(1, 1, 1);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [TicTacToe]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TicTacToe);
        comp = fixture.componentInstance;
        deCanvas = fixture.debugElement.query(By.css('canvas'));
        deButton = fixture.debugElement.query(By.css('button'));
    });

    it('should create component', () => {
        expect(comp).toBeDefined();
        comp.create(comp, rrMultirunInfo, nrMultirunInfo, rnMultirunInfo, nnMultirunInfo)();

        expect(rrMultirunInfo.xWins > 1);
        expect(nrMultirunInfo.xWins > 1);
        expect(rnMultirunInfo.xWins > 1);
        expect(nnMultirunInfo.xWins > 1);

        expect(comp.playTicTacToe).toBeDefined();
    });

    it('should have playTicTacToe players & board defined', () => {
        comp.create(comp, rrMultirunInfo, nrMultirunInfo, rnMultirunInfo, nnMultirunInfo)();

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

class MockTicTacToe extends TicTacToe {
    createPlayTicTacToe(playerTicTacToeX, playerTicTacToeO, displayBoard) {
        return new MockPlayTicTacToe(playerTicTacToeX, playerTicTacToeO, displayBoard);
    }
}

class MockPlayTicTacToe extends PlayTicTacToe {
    playAgain() {

    }
}
