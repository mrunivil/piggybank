import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { PreferencesComponent } from './components/settings/preferences.component';
import { PreferencesRoutingModule } from './preference.routing.module';
import { FirebasePreferencesService } from './services/firebase/preferences.service';
import { LocalPreferencesService } from "./services/local/preferences.service";
import { PreferencesService } from "./services/preferences.service";
import { PreferencesState } from './state/preferences.state';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([PreferencesState]),
    PreferencesRoutingModule
  ],
  providers: [
    {
      provide: PreferencesService, useClass: environment.service === 'local' ? LocalPreferencesService : FirebasePreferencesService
    }
  ],
  declarations: [PreferencesComponent, HeaderComponent]
})
export class PreferencesModule { }
