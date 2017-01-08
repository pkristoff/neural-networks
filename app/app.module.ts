import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';
import {TicTacToe} from './ttt/ttt.component';
import {WorldComponent} from './creatures/world.component';


@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent,
        TicTacToe,
        WorldComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
