import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './components/login-form/login.component';
import { LoginRoutingModule } from './login.routing.module';
import { AuthService } from './services/auth';
import { FirebaseAuthService } from './services/firebase/auth.service';
import { LocalAuthService } from './services/local/auth.service';
import { AuthState } from './state/auth.state';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    NgxsModule.forFeature([AuthState])
  ],
  providers: [
    {
      provide: AuthService, useClass: environment.service === 'local' ? LocalAuthService : FirebaseAuthService
    }
  ]
})
export class LoginModule { }
