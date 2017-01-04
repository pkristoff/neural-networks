"use strict";
var tic_tac_toe_1 = require('./tic-tac-toe');
var DrawTicTacToe = (function () {
    function DrawTicTacToe(context, rootX, rootY) {
        this.CELL_OFFSET = 5;
        this.CELL_WIDTH = 20;
        this.CELL_HEIGHT = 20;
        this.PI_2 = 2 * Math.PI;
        this.context = context;
        this.rootX = rootX;
        this.rootY = rootY;
        this.cells = {
            0: new tic_tac_toe_1.TicTacToeCell(rootX, rootY, 0, 0, this.CELL_WIDTH, this.CELL_HEIGHT),
            1: new tic_tac_toe_1.TicTacToeCell(rootX, rootY, this.CELL_WIDTH, 0, this.CELL_WIDTH, this.CELL_HEIGHT),
            2: new tic_tac_toe_1.TicTacToeCell(rootX, rootY, (this.CELL_WIDTH * 2), 0, this.CELL_WIDTH, this.CELL_HEIGHT),
            3: new tic_tac_toe_1.TicTacToeCell(rootX, rootY, 0, this.CELL_HEIGHT, this.CELL_WIDTH, this.CELL_HEIGHT),
            4: new tic_tac_toe_1.TicTacToeCell(rootX, rootY, this.CELL_WIDTH, this.CELL_HEIGHT, this.CELL_WIDTH, this.CELL_HEIGHT),
            5: new tic_tac_toe_1.TicTacToeCell(rootX, rootY, (this.CELL_WIDTH * 2), this.CELL_HEIGHT, this.CELL_WIDTH, this.CELL_HEIGHT),
            6: new tic_tac_toe_1.TicTacToeCell(rootX, rootY, 0, (this.CELL_HEIGHT * 2), this.CELL_WIDTH, this.CELL_HEIGHT),
            7: new tic_tac_toe_1.TicTacToeCell(rootX, rootY, this.CELL_WIDTH, (this.CELL_HEIGHT * 2), this.CELL_WIDTH, this.CELL_HEIGHT),
            8: new tic_tac_toe_1.TicTacToeCell(rootX, rootY, (this.CELL_WIDTH * 2), (this.CELL_HEIGHT * 2), this.CELL_WIDTH, this.CELL_HEIGHT)
        };
    }
    DrawTicTacToe.prototype.drawBoard = function () {
        var ctx = this.context, boardWidth = this.CELL_WIDTH * 3, boardHeight = this.CELL_HEIGHT * 3;
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
    };
    DrawTicTacToe.prototype.drawX = function (cell) {
        var tttCell = this.cells[cell];
        var absoluteX = tttCell.absoluteX();
        var absoluteY = tttCell.absoluteY();
        var absoluteEndX = tttCell.absoluteEndX();
        var absoluteEndY = tttCell.absoluteEndY();
        this.context.beginPath();
        this.context.moveTo(absoluteX + this.CELL_OFFSET, absoluteY + this.CELL_OFFSET);
        this.context.lineTo(absoluteEndX - this.CELL_OFFSET, absoluteEndY - this.CELL_OFFSET);
        this.context.stroke();
        this.context.moveTo(absoluteX + this.CELL_OFFSET, absoluteEndY - this.CELL_OFFSET);
        this.context.lineTo(absoluteEndX - this.CELL_OFFSET, absoluteY + this.CELL_OFFSET);
        this.context.stroke();
    };
    DrawTicTacToe.prototype.drawO = function (cell) {
        var tttCell = this.cells[cell];
        var absoluteX = tttCell.absoluteX();
        var absoluteY = tttCell.absoluteY();
        var offset = 5;
        var cellWidth = tttCell.cellWidth();
        var cellHeight = tttCell.cellHeight();
        var radius = ((cellWidth) - (offset * 2)) / 2;
        var cellCenterX = absoluteX + cellWidth / 2;
        var cellCenterY = absoluteY + cellHeight / 2;
        this.context.beginPath();
        this.context.arc(cellCenterX, cellCenterY, radius, this.PI_2, false);
        this.context.stroke();
    };
    return DrawTicTacToe;
}());
exports.DrawTicTacToe = DrawTicTacToe;
//# sourceMappingURL=drawTicTacToe.js.map