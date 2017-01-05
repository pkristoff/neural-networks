import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';
import {TicTacToe} from './ttt/ttt.component';


@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent,
        TicTacToe
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
