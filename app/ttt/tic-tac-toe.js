"use strict";
var TicTacToeCell = (function () {
    function TicTacToeCell(rootX, rootY, originX, originY, width, height) {
        this.rootX = rootX;
        this.rootY = rootY;
        this.originX = originX;
        this.originY = originY;
        this.width = width;
        this.height = height;
    }
    TicTacToeCell.prototype.absoluteX = function () {
        return this.rootX + this.originX;
    };
    TicTacToeCell.prototype.absoluteY = function () {
        return this.rootY + this.originY;
    };
    TicTacToeCell.prototype.absoluteEndX = function () {
        return this.rootX + this.originX + this.width;
    };
    TicTacToeCell.prototype.absoluteEndY = function () {
        return this.rootY + this.originY + this.height;
    };
    TicTacToeCell.prototype.cellWidth = function () {
        return this.width;
    };
    TicTacToeCell.prototype.cellHeight = function () {
        return this.height;
    };
    return TicTacToeCell;
}());
exports.TicTacToeCell = TicTacToeCell;
//# sourceMappingURL=tic-tac-toe.js.map