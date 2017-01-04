"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var XorComponent = (function () {
    function XorComponent() {
        this.results = {
            error: -1,
            iterations: -1,
            time: -1
        };
        this.outputs = [];
        this.validate = function (perceptron) {
            this.outputs = [];
            this.outputs.push({
                input: '0 0',
                output: perceptron.activate([0, 0])[0].toFixed(3),
                target: 0
            });
            this.outputs.push({
                input: '0 1',
                output: perceptron.activate([0, 1])[0].toFixed(3),
                target: 1
            });
            this.outputs.push({
                input: '1 0',
                output: perceptron.activate([1, 0])[0].toFixed(3),
                target: 1
            });
            this.outputs.push({
                input: '1 1',
                output: perceptron.activate([1, 1])[0].toFixed(3),
                target: 0
            });
        };
    }
    ;
    XorComponent.prototype.train = function () {
        var perceptron = new synaptic.Architect.Perceptron(2, 3, 1);
        this.results = perceptron.trainer.XOR({
            iterations: 100000,
            error: .0001,
            rate: 1
        });
        this.validate(perceptron);
    };
    XorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'nn-xor',
            templateUrl: 'xor.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], XorComponent);
    return XorComponent;
}());
exports.XorComponent = XorComponent;
//# sourceMappingURL=xor.component.js.map