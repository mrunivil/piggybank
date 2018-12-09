import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { ActionComponent } from './components/action/action.component';
import { ActionState } from './state/action.state';
import { ActionRoutingModule } from './action.routing.module';
import { ActionService } from './services/action.service';
import { LocalActionService } from './services/local/action.service';
import { FirebaseActionService } from './services/firebase/action.service';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
    declarations: [
        ActionComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        NgxsModule.forFeature([ActionState]),
        ActionRoutingModule
    ],
    providers: [
        {
            provide: ActionService, useClass: environment.service === 'local' ? LocalActionService : FirebaseActionService
        }
    ]
})
export class ActionModule { }
