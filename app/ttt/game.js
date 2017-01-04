"use strict";
var NN = (function () {
    /**
     * Default constructor
     */
    function NN(downSampledSize, hiddenLayer, outputLayer) {
        if (hiddenLayer === void 0) { hiddenLayer = 100; }
        if (outputLayer === void 0) { outputLayer = 2; }
        // setup our network
        this.inputLayer = new synaptic.Layer(downSampledSize * downSampledSize);
        this.hiddenLayer = new synaptic.Layer(hiddenLayer);
        this.outputLayer = new synaptic.Layer(outputLayer);
        this.inputLayer.project(this.hiddenLayer);
        this.hiddenLayer.project(this.outputLayer);
        this.network = new synaptic.Network({
            input: this.inputLayer,
            hidden: [this.hiddenLayer],
            output: this.outputLayer
        });
    }
    /**
     * Classify
     * @param  {Array} inputs to classify
     * @return {float}
     */
    NN.prototype.classify = function (inputs) {
        return this.network.activate(inputs);
    };
    /**
     * Import Network
     * @param  {string} jsonNetwork json
     */
    NN.prototype.importNetwork = function (jsonNetwork) {
        this.network = synaptic.Network.fromJSON(jsonNetwork);
    };
    return NN;
}());
exports.NN = NN;
/**
 * Boot state
 * @author Glenn De Backer <glenn@simplicity.be>
 */
var bootState = {
    /**
     * Preload
     */
    preload: function () {
        // load settings
        this.game.load.json('settings', 'settings.json');
    },
    /**
     * Create
     */
    create: function () {
        // call the load state
        this.game.state.start('load');
    }
};
/**
 * Load state
 * @author Glenn De Backer <glenn@simplicity.be>
 */
var loadState = {
    /**
     * Preload
     */
    preload: function () {
        // load neural network json
        this.game.load.json('neuralnetwork_json', 'network.json');
        // load image assets
        this.game.load.image('background', 'assets/img/bg.png');
        this.game.load.image('logo', 'assets/img/logo.png');
        this.game.load.spritesheet('reset_buttons', 'assets/img/reset_buttons.png', 200, 90);
        this.game.load.image('tile', 'assets/img/tile.png');
        this.game.load.image('x', 'assets/img/x.png');
        this.game.load.image('o', 'assets/img/o.png');
    },
    /**
     * Load neural network
     * @return {[type]} [description]
     */
    loadNeuralNetwork: function (settings) {
        // construct ANN
        this.game.neuralnetwork = new NN(settings.neuralnetwork.input, settings.neuralnetwork.hidden, 2);
        // import trained network
        this.game.neuralnetwork.importNetwork(this.game.cache.getJSON('neuralnetwork_json'));
    },
    /**
     * Create
     */
    create: function () {
        // get settings
        var settings = this.game.cache.getJSON('settings');
        // load neural neuralnetwork
        this.loadNeuralNetwork(settings);
        // call the splash state
        this.game.state.start('splash');
    }
};
/**
 * Splash state
 * @author Glenn De Backer <glenn@simplicity.be>
 */
var splashState = {
    /**
     * Create
     */
    create: function () {
        // call the splash state
        this.game.state.start('play');
    }
};
/**
 * Play state
 * @author Glenn De Backer <glenn@simplicity.be>
 */
var playState = {
    /**
     * Create
     */
    create: function () {
        // settings
        var settings = this.game.cache.getJSON('settings');
        // setup our brushes
        this.setupBrushes();
        // hold our active tile
        this.activeTileName = null;
        // hold our tiles
        this.tiles = [];
        // hold references to tweens
        this.tweens = [];
        // hold our dynamic textures for our tiles
        this.tilesBitmapData = [];
        // output bitmapdata
        this.outputBitmapData = this.game.make.bitmapData(150, 150);
        //this.outputBitmapData.addToWorld(); // show output
        // create our background
        this.createBackground();
        // create reset button
        this.createResetButton();
        // create our grid
        this.createGridTile('tile_1', 80, 60);
        this.createGridTile('tile_2', 240, 60);
        this.createGridTile('tile_3', 400, 60);
        this.createGridTile('tile_4', 80, 225);
        this.createGridTile('tile_5', 240, 225);
        this.createGridTile('tile_6', 400, 225);
        this.createGridTile('tile_7', 80, 390);
        this.createGridTile('tile_8', 240, 390);
        this.createGridTile('tile_9', 400, 390);
        // setup output canvas
        this.setupOutputCanvas(settings);
        // setup our mouse move callback
        this.game.input.addMoveCallback(this.mouseMove, this);
    },
    /**
     * Setup output canvas
     */
    setupOutputCanvas: function (settings) {
        // create output canvas
        this.outputCanvasElem = document.createElement("canvas");
        this.outputCanvasElem.setAttribute("id", "output-canvas");
        this.outputCanvasElem.setAttribute("width", settings.neuralnetwork.input);
        this.outputCanvasElem.setAttribute("height", settings.neuralnetwork.input);
        // append output canvas
        document.body.appendChild(this.outputCanvasElem);
    },
    /**
     * Setup brushes
     */
    setupBrushes: function (brushSize) {
        if (brushSize === void 0) { brushSize = 4; }
        // our tile brush
        this.brushTile = this.game.make.bitmapData(brushSize, brushSize);
        this.brushTile.circle(brushSize / 2, brushSize / 2, brushSize / 2, 'rgba(93, 149, 255,0.8)');
        // our output brush
        this.brushOutput = this.game.make.bitmapData(brushSize, brushSize);
        this.brushOutput.circle(brushSize / 2, brushSize / 2, brushSize / 2, 'rgba(255,255,255,1.0)');
    },
    /**
     * Create background
     */
    createBackground: function () {
        // grid
        this.background = this.game.add.sprite(0, 0, 'background');
        this.background.scale.x = 1.1;
        this.background.scale.y = 1.1;
        // logo
        this.logo = this.game.add.sprite(20, 550, 'logo');
        this.logo.scale.x = 0.8;
        this.logo.scale.y = 0.8;
        this.logo.alpha = 0.8;
    },
    /**
     * Create reset button
     */
    createResetButton: function () {
        // add button
        this.resetButton = this.game.add.button(615, 60, 'reset_buttons', this.resetGame, this, 2, 1, 0);
        this.resetButton.scale.x = 0.6;
        this.resetButton.scale.y = 0.6;
    },
    /**
     * Create grid tile
     *
     * @param  {string} name   of grid
     * @param  {int} x      position
     * @param  {int} y      position
     * @param  {int} width
     * @param  {int} height
     */
    createGridTile: function (name, x, y, width, height) {
        if (width === void 0) { width = 150; }
        if (height === void 0) { height = 150; }
        // create sprite
        this.tiles[name] = this.game.add.sprite(x, y);
        this.tiles[name].name = name;
        this.tiles[name].inputEnabled = true;
        this.tiles[name].input.useHandCursor = true;
        this.tiles[name].classification = null;
        // setup events
        this.tiles[name].events.onInputDown.add(this.tileMouseDown, this);
        this.tiles[name].events.onInputOut.add(this.tileMouseLeave, this);
        // create bitmapdata (dynamic texture)
        this.tilesBitmapData[name] = this.game.make.bitmapData(width, height);
        this.tilesBitmapData[name].copy('tile');
        // assign texture to sprite
        this.tilesBitmapData[name].add(this.tiles[name]);
    },
    /**
     * Reset game
     */
    resetGame: function () {
        // remove any animations
        for (var tileName in this.tweens) {
            this.tweens[tileName].stop();
            this.tiles[tileName].alpha = 1;
        }
        // reset textures
        for (var tileName in this.tilesBitmapData) {
            if (this.tilesBitmapData.hasOwnProperty(tileName)) {
                this.tilesBitmapData[tileName].clear();
                this.tilesBitmapData[tileName].copy('tile');
            }
        }
        // reset any previous classification
        for (var tileName in this.tiles) {
            this.tiles[tileName].classification = null;
        }
    },
    /**
     * Clear tile
     * @param  {string} name of tile to clear
     */
    clearTile: function (name) {
        // copy empty tile
        this.tilesBitmapData[name].copy('tile');
    },
    /**
     * Handles when mouse down event is occuring over a tile
     * @param  {any} sprite used
     * @param  {any} pointer not used
     */
    tileMouseDown: function (sprite, pointer) {
        // store active tile name
        this.activeTileName = sprite.name;
    },
    /**
     * Handles when mouse up event is occuring over a tile
     * @param  {any} sprite used
     * @param  {any} pointer not used
     */
    tileMouseLeave: function (sprite, pointer) {
        if (this.activeTileName !== null) {
            // delete active tile name
            this.activeTileName = null;
            // resize output bitmapdata to format that
            // will be classified by our neural network
            pica.resizeCanvas(this.outputBitmapData.canvas, this.outputCanvasElem, {}, function () {
                // classify tile
                this.classifyActiveTile().then(function (result) {
                    // store result in tile object
                    var classification = result[0] > result[1] ? "o" : "x";
                    this.tiles[sprite.name].classification = classification;
                    // update tile texture that represent classification
                    this.tilesBitmapData[sprite.name].clear();
                    this.tilesBitmapData[sprite.name].copy(classification);
                    // clear output bitmapdata
                    this.outputBitmapData.clear();
                    // checkBoard for winner
                    var winnerInfo = this.checkBoard();
                    if (winnerInfo.winner) {
                        // console.log(`winner: ${winnerInfo.winner}`);
                        // console.log(winnerInfo.winnerTiles);
                        for (var tileName in winnerInfo.winnerTiles) {
                            if (this.tilesBitmapData.hasOwnProperty(tileName)) {
                                // animate winning tiles
                                this.tweens[tileName] = this.game.add.tween(this.tiles[tileName]).to({ alpha: [0, 1] }, 900, "Linear", true);
                                this.tweens[tileName].repeat(500, 200);
                            }
                        }
                    }
                }.bind(this));
            }.bind(this));
        }
    },
    /**
     * Classify active tile
     */
    classifyActiveTile: function () {
        // create promise object
        return new Promise(function (resolve, reject) {
            var pixels = [];
            // get pixels data
            var ctx = this.outputCanvasElem.getContext('2d');
            var pixelsData = ctx.getImageData(0, 0, this.outputCanvasElem.width, this.outputCanvasElem.height).data;
            // iterate over pixel data
            for (var i = 0; i < pixelsData.length; i += 4) {
                // get R values (as G,B is the same when using B&W)
                var red = pixelsData[i];
                // normalize between 0.0 and 1.0
                // and store into pixels array
                pixels.push(red / 255.0);
            }
            // classify
            var results = this.game.neuralnetwork.classify(pixels);
            resolve(results);
        }.bind(this));
        // return promise;
    },
    /**
     * Handles mouse move callback
     */
    mouseMove: function (pointer, x, y) {
        if (pointer.isDown && this.activeTileName !== null) {
            this.draw(x, y);
        }
    },
    /**
     * Draw
     */
    draw: function (mouseX, mouseY) {
        // calculate relative x and y coordinates
        var relX = mouseX - this.tiles[this.activeTileName].x;
        var relY = mouseY - this.tiles[this.activeTileName].y;
        // draw
        this.tilesBitmapData[this.activeTileName].draw(this.brushTile, relX, relY);
        this.outputBitmapData.draw(this.brushOutput, relX, relY);
    },
    /**
     * Check board
     */
    checkBoard: function () {
        var winner = null;
        var winnerTiles = [];
        // check horizontal
        for (var x = 1, xMax = 9; x <= xMax; x += 3) {
            if (this.tiles[("tile_" + x)].classification == null) {
                continue;
            }
            else if (this.tiles[("tile_" + x)].classification !== this.tiles[("tile_" + (x + 1))].classification) {
                continue;
            }
            else if (this.tiles[("tile_" + (x + 1))].classification !== this.tiles[("tile_" + (x + 2))].classification) {
                continue;
            }
            // store winner and winning tiles
            winner = this.tiles[("tile_" + x)].classification;
            winnerTiles.push("tile_" + x);
            winnerTiles.push("tile_" + (x + 1));
            winnerTiles.push("tile_" + (x + 2));
        }
        // check vertical
        if (winner === null) {
            winnerTiles = [];
            for (var y = 1, yMax = 3; y <= yMax; y++) {
                // if first item is null we can skip the rest
                if (this.tiles[("tile_" + y)].classification == null) {
                    continue;
                }
                else if (this.tiles[("tile_" + y)].classification !== this.tiles[("tile_" + (y + 3))].classification) {
                    continue;
                }
                else if (this.tiles[("tile_" + (y + 3))].classification !== this.tiles[("tile_" + (y + 6))].classification) {
                    continue;
                }
                // store winner and winning tiles
                winner = this.tiles[("tile_" + y)].classification;
                winnerTiles.push("tile_" + y);
                winnerTiles.push("tile_" + (y + 3));
                winnerTiles.push("tile_" + (y + 6));
            }
        }
        // diagonal left -> right
        if (winner === null) {
            winnerTiles = [];
            if (this.tiles['tile_1'].classification !== null) {
                if (this.tiles['tile_1'].classification === this.tiles['tile_5'].classification) {
                    if (this.tiles['tile_5'].classification === this.tiles['tile_9'].classification) {
                        // store winner and winning tiles
                        winner = this.tiles['tile_1'].classification;
                        winnerTiles.push("tile_1");
                        winnerTiles.push("tile_5");
                        winnerTiles.push("tile_9");
                    }
                }
            }
        }
        // diagonal right -> left
        if (winner === null) {
            winnerTiles = [];
            if (this.tiles['tile_3'].classification !== null) {
                if (this.tiles['tile_3'].classification === this.tiles['tile_5'].classification) {
                    if (this.tiles['tile_5'].classification === this.tiles['tile_7'].classification) {
                        // store winner and winning tiles
                        winner = this.tiles['tile_3'].classification;
                        winnerTiles.push("tile_3");
                        winnerTiles.push("tile_5");
                        winnerTiles.push("tile_7");
                    }
                }
            }
        }
        return { winner: winner, winnerTiles: winnerTiles };
    }
};
/**
 * PhaserANNGame class
 *
 * @author Glenn De Backer <glenn@simplicity.be>
 *
 */
var PhaserANNGame = (function () {
    /**
     * Constructor
     */
    function PhaserANNGame() {
        // init phaser game object
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-container');
        // shared
        this.game.shared = {};
        // add all our states
        this.game.state.add('boot', bootState);
        this.game.state.add('load', loadState);
        this.game.state.add('splash', splashState);
        this.game.state.add('play', playState);
        // 'boot' our game
        this.game.state.start('boot');
    }
    return PhaserANNGame;
}());
exports.PhaserANNGame = PhaserANNGame;
//# sourceMappingURL=game.js.map