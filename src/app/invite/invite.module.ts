import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InviteComponent } from './components/invite/invite.component';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { InviteService } from './services/invite.service';
import { environment } from 'src/environments/environment';
import { LocalInviteService } from './services/local/invite.service';
import { FirebaseInviteService } from './services/firebase/invite.service';
import { NgxsModule } from '@ngxs/store';
import { InviteState } from './state/invite.state';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
    declarations: [InviteComponent, HeaderComponent],
    providers: [
        {
            provide: InviteService, useClass: environment.service === 'local' ? LocalInviteService : FirebaseInviteService
        }
    ],
    imports: [
        CommonModule,
        //testing
        HttpClientModule,
        RouterModule.forChild([
            {
                path: '',
                component: InviteComponent
            }

        ]),
        NgxsModule.forFeature([InviteState])
    ]
})
export class InviteModule { }