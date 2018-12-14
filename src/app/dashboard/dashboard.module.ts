import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { BankItemComponent } from './components/bank-item/bank-item.component';
import { BankListComponent } from './components/bank-list/bank-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { DashboardService } from './services/dashboard.service';
import { FirebaseDashboardService } from './services/firebase/dashboard.service';
import { LocalDashboardService } from './services/local/dashboard.service';
import { DashboardState } from './state/dashboard.state';


@NgModule({
  declarations: [
    DashboardComponent,
    BankListComponent,
    BankItemComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    NgxsModule.forFeature([DashboardState]),
    DashboardRoutingModule
  ],
  providers: [
    {
      provide: DashboardService, useClass: environment.service === 'local' ? LocalDashboardService : FirebaseDashboardService
    }
  ]
})
export class DashboardModule { }
