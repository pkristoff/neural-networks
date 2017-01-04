import {TicTacToeCell} from './tic-tac-toe';

export class DrawTicTacToe {
    context: any;
    rootX: number;
    rootY: number;
    cells: any;

    CELL_OFFSET: number = 5;
    CELL_WIDTH: number = 20;
    CELL_HEIGHT: number = 20;
    PI_2: number = 2 * Math.PI;

    constructor(context: any, rootX: number, rootY: number) {
        this.context = context;
        this.rootX = rootX;
        this.rootY = rootY;
        this.cells = {
            0: new TicTacToeCell(rootX, rootY, 0, 0, this.CELL_WIDTH, this.CELL_HEIGHT),
            1: new TicTacToeCell(rootX, rootY, this.CELL_WIDTH, 0, this.CELL_WIDTH, this.CELL_HEIGHT),
            2: new TicTacToeCell(rootX, rootY, (this.CELL_WIDTH * 2), 0, this.CELL_WIDTH, this.CELL_HEIGHT),
            3: new TicTacToeCell(rootX, rootY, 0, this.CELL_HEIGHT, this.CELL_WIDTH, this.CELL_HEIGHT),
            4: new TicTacToeCell(rootX, rootY, this.CELL_WIDTH, this.CELL_HEIGHT, this.CELL_WIDTH, this.CELL_HEIGHT),
            5: new TicTacToeCell(rootX, rootY, (this.CELL_WIDTH * 2), this.CELL_HEIGHT, this.CELL_WIDTH, this.CELL_HEIGHT),
            6: new TicTacToeCell(rootX, rootY, 0, (this.CELL_HEIGHT * 2), this.CELL_WIDTH, this.CELL_HEIGHT),
            7: new TicTacToeCell(rootX, rootY, this.CELL_WIDTH, (this.CELL_HEIGHT * 2), this.CELL_WIDTH, this.CELL_HEIGHT),
            8: new TicTacToeCell(rootX, rootY, (this.CELL_WIDTH * 2), (this.CELL_HEIGHT * 2), this.CELL_WIDTH, this.CELL_HEIGHT)
        }
    }


    drawBoard() {

        let ctx = this.context,
            boardWidth = this.CELL_WIDTH * 3,
            boardHeight = this.CELL_HEIGHT * 3;

        ctx.beginPath();

        ctx.moveTo(this.rootX, this.rootY + this.CELL_HEIGHT);
        ctx.lineTo(this.rootX + boardWidth, this.rootY + this.CELL_HEIGHT);
        ctx.stroke();

        ctx.moveTo(this.rootX, this.rootY + (this.CELL_HEIGHT * 2));
        ctx.lineTo(this.rootX + boardWidth, this.rootY + (this.CELL_HEIGHT * 2));
        ctx.stroke();

        ctx.moveTo(this.rootX + this.CELL_WIDTH, this.rootY);
        ctx.lineTo(this.rootX + this.CELL_WIDTH, this.rootY + boardHeight);
        ctx.stroke();

        ctx.moveTo(this.rootX + (this.CELL_WIDTH * 2), this.rootY);
        ctx.lineTo(this.rootX + (this.CELL_WIDTH * 2), this.rootY + boardHeight);
        ctx.stroke();

    }

    drawX(cell: number) {

        let tttCell: TicTacToeCell = this.cells[cell];
        let absoluteX = tttCell.absoluteX();
        let absoluteY = tttCell.absoluteY();
        let absoluteEndX = tttCell.absoluteEndX();
        let absoluteEndY = tttCell.absoluteEndY();

        this.context.beginPath();

        this.context.moveTo(absoluteX + this.CELL_OFFSET, absoluteY + this.CELL_OFFSET);
        this.context.lineTo(absoluteEndX - this.CELL_OFFSET, absoluteEndY - this.CELL_OFFSET);
        this.context.stroke();

        this.context.moveTo(absoluteX + this.CELL_OFFSET, absoluteEndY - this.CELL_OFFSET);
        this.context.lineTo(absoluteEndX - this.CELL_OFFSET, absoluteY + this.CELL_OFFSET);
        this.context.stroke();

    }

    drawO(cell: number) {

        let tttCell: TicTacToeCell = this.cells[cell];
        let absoluteX = tttCell.absoluteX();
        let absoluteY = tttCell.absoluteY();
        let offset = 5;
        let cellWidth = tttCell.cellWidth();
        let cellHeight = tttCell.cellHeight();
        let radius = ((cellWidth) - (offset * 2)) / 2;
        let cellCenterX = absoluteX + cellWidth / 2;
        let cellCenterY = absoluteY + cellHeight / 2;

        this.context.beginPath();
        this.context.arc(cellCenterX, cellCenterY, radius, this.PI_2, false);
        this.context.stroke();
    }
}