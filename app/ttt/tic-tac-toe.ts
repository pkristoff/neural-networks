export class TicTacToeCell {
    rootX: number;
    rootY: number;
    originX: number;
    originY: number;
    width: number;
    height: number;

    constructor(rootX: number, rootY: number, originX: number, originY: number, width, height) {
        this.rootX = rootX;
        this.rootY = rootY;
        this.originX = originX;
        this.originY = originY;
        this.width = width;
        this.height = height;
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
}