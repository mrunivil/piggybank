import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferencesComponent } from './components/settings/preferences.component';
import { environment } from 'src/environments/environment';
import { PreferencesService } from "./services/preferences.service";
import { LocalPreferencesService } from "./services/local/preferences.service";
import { FirebasePreferencesService } from './services/firebase/preferences.service';
import { PreferencesState } from './state/preferences.state';
import { NgxsModule } from '@ngxs/store';
import { PreferencesRoutingModule } from './preference.routing.module';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
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
