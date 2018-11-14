import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BankItemComponent } from './components/bank-item/bank-item.component';
import { BankListComponent } from './components/bank-list/bank-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { BankService } from './services/bank';
import { environment } from 'src/environments/environment';
import { LocalBankService } from './services/local/bank.service';
import { FirebaseBankService } from './services/firebase/bank.service';
import { Store, NgxsModule } from '@ngxs/store';
import { LoadUserOwenedBanksAction } from './state/actions';
import { DashboardState } from './state/dashboard.state';

@NgModule({
  declarations: [
    DashboardComponent,
    BankListComponent,
    BankItemComponent
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
