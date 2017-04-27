import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {AgGridModule} from "ag-grid-angular/main";
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import {APP_ROUTES_PROVIDER} from './app.routes';
import { UserComponent } from './user/user.component'
import {StrategyService} from './shared/services/strategy.service';
import { OptionWidgetComponent } from './option-widget/option-widget.component'

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    UserComponent,
    OptionWidgetComponent
  ],
  imports: [
    APP_ROUTES_PROVIDER,
    BrowserModule,
    FormsModule,
    HttpModule,
    AgGridModule.withComponents([])
  ],
  providers: [StrategyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
