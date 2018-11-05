import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login-form/login.component';
import { LoginRoutingModule } from './login.routing.module';
import { LocalAuthService } from './services/local/auth.service';
import { AuthService } from './services/auth';
import { environment } from 'src/environments/environment';
import { FirebaseAuthService } from './services/firebase/auth.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule
  ],
  providers: [
    {
      provide: AuthService, useClass: environment.service === 'local' ? LocalAuthService : FirebaseAuthService
    }
  ]
})
export class LoginModule { }
