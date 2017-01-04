import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';
import {XorComponent} from './xor/xor.component';
import {WorldComponent} from './creatures/world.component';
import {TicTacToe} from './ttt/ttt.component';


@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent,
        XorComponent,
        WorldComponent,
         TicTacToe

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
