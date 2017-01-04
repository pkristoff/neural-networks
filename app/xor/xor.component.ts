import {Component} from '@angular/core';

declare let synaptic: any;
declare let module: any;

@Component({
    moduleId: module.id,
    selector: 'nn-xor',
    templateUrl: 'xor.component.html'
})

export class XorComponent {
    constructor() {
    };

    results: any = {
        error: -1,
        iterations: -1,
        time: -1
    };
    outputs: any = [];

    train() {
        let perceptron = new synaptic.Architect.Perceptron(2, 3, 1);
        this.results = perceptron.trainer.XOR({
            iterations: 100000,
            error: .0001,
            rate: 1
        });
        this.validate(perceptron);
    }

    validate = function (perceptron: any) {
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
    }
}
