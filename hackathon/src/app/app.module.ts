import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { TopnavbarComponent } from './components/shared/topnavbar/topnavbar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WalletComponent,
    SidebarComponent,
    TopnavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
