import {PlayerTicTacToe} from './playerTicTacToe';

export class TicTacToeCell {
    rootX: number;
    rootY: number;
    originX: number;
    originY: number;
    width: number;
    height: number;
    context: any;

    PI_2: number = 2 * Math.PI;
    CELL_OFFSET: number = 5;

    constructor(rootX: number, rootY: number, originX: number, originY: number, width: number, height: number, context: any) {
        this.rootX = rootX;
        this.rootY = rootY;
        this.originX = originX;
        this.originY = originY;
        this.width = width;
        this.height = height;
        this.context = context;
    }

    absoluteX() {
        return this.rootX + this.originX;
    }

    absoluteY() {
        return this.rootY + this.originY;
    }

    absoluteEndX() {
        return this.rootX + this.originX + this.width;
    }

    absoluteEndY() {
        return this.rootY + this.originY + this.height;
    }

    cellWidth() {
        return this.width;
    }

    cellHeight() {
        return this.height;
    }

    drawX() {

        let absoluteX = this.absoluteX();
        let absoluteY = this.absoluteY();
        let absoluteEndX = this.absoluteEndX();
        let absoluteEndY = this.absoluteEndY();

        this.context.beginPath();

        this.context.moveTo(absoluteX + this.CELL_OFFSET, absoluteY + this.CELL_OFFSET);
        this.context.lineTo(absoluteEndX - this.CELL_OFFSET, absoluteEndY - this.CELL_OFFSET);
        this.context.stroke();

        this.context.moveTo(absoluteX + this.CELL_OFFSET, absoluteEndY - this.CELL_OFFSET);
        this.context.lineTo(absoluteEndX - this.CELL_OFFSET, absoluteY + this.CELL_OFFSET);
        this.context.stroke();

    }

    drawO(){
        let absoluteX = this.absoluteX();
        let absoluteY = this.absoluteY();
        let offset = 5;
        let cellWidth = this.cellWidth();
        let cellHeight = this.cellHeight();
        let radius = ((cellWidth) - (offset * 2)) / 2;
        let cellCenterX = absoluteX + cellWidth / 2;
        let cellCenterY = absoluteY + cellHeight / 2;

        this.context.beginPath();
        this.context.arc(cellCenterX, cellCenterY, radius, this.PI_2, false);
        this.context.stroke();
    }
    // drawing winning line across a row
    drawAcross(player: PlayerTicTacToe){
        this.drawTokenForPlayer(player);

    }

    // drawing winning line down a column
    drawDown(player: PlayerTicTacToe){
        this.drawTokenForPlayer(player);

    }
    // drawing winning line diagonally
    drawDiagonalUp(player: PlayerTicTacToe){
        this.drawTokenForPlayer(player);

    }
    // drawing winning line diagonally
    drawDiagonalDown(player: PlayerTicTacToe){
        this.drawTokenForPlayer(player);

    }

    // draws over the current value for cell with a red version.
    private drawTokenForPlayer(player: PlayerTicTacToe) {
        this.context.strokeStyle = '#ff0000';
        if (player.isX) {
            this.drawX();
        } else {
            this.drawO();
        }
        this.context.strokeStyle = '#000000';
    }
}