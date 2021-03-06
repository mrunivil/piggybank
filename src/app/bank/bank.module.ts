import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { BankRoutingModule } from './bank.routing.module';
import { BankCreationComponent } from './components/creation/bank.creation.component';
import { BankDetailsComponent } from './components/details/bank.details.component';
import { HeaderComponent } from './components/header/header.component';
import { HistoryComponent } from './components/history/history.component';
import { BankService } from './services/bank.service';
import { FirebaseBankService } from './services/firebase/bank.service';
import { LocalBankService } from './services/local/bank.service';
import { BankState } from './state/bank.state';
import { ActionComponent } from './components/action/action.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent, BankDetailsComponent, BankCreationComponent, HistoryComponent, ActionComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    BankRoutingModule,
    NgxsModule.forFeature([BankState])
  ],
  providers: [
    {
      provide: BankService, useClass: environment.service === 'local' ? LocalBankService : FirebaseBankService
    }
  ]
})
export class BankModule { }
