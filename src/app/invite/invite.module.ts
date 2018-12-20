import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { InviteComponent } from './components/invite/invite.component';
import { FirebaseInviteService } from './services/firebase/invite.service';
import { InviteService } from './services/invite.service';
import { LocalInviteService } from './services/local/invite.service';
import { InviteState } from './state/invite.state';

@NgModule({
    declarations: [InviteComponent, HeaderComponent],
    providers: [
        {
            provide: InviteService, useClass: environment.service === 'local' ? LocalInviteService : FirebaseInviteService
        }
    ],
    imports: [
        CommonModule,
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