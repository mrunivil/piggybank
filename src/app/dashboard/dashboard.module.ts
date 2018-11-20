import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { BankItemComponent } from './components/bank-item/bank-item.component';
import { BankListComponent } from './components/bank-list/bank-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { BankService } from './services/dashboard.service';
import { FirebaseBankService } from './services/firebase/dashboard.service';
import { LocalBankService } from './services/local/dashboard.service';
import { DashboardState } from './state/dashboard.state';
import { HeaderComponent } from './components/header/header.component';

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
      provide: BankService, useClass: environment.service === 'local' ? LocalBankService : FirebaseBankService
    }
  ]
})
export class DashboardModule { }
