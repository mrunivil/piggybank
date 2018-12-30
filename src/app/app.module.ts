import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgxsModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    // NgxsReduxDevtoolsPluginModule.forRoot({
    //   disabled: environment.production
    // }),
    // NgxsLoggerPluginModule.forRoot({
    //   collapsed: false,
    //   disabled: environment.production
    // })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
