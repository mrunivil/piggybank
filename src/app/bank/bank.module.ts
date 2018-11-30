import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { BankRoutingModule } from './bank.routing.module';
import { BankDetailsComponent } from './components/details/bank.details.component';
import { HeaderComponent } from './components/header/header.component';
import { BankService } from './services/bank.service';
import { BankState } from './state/bank.state';
import { LocalBankService } from './services/local/bank.service';
import { FirebaseBankService } from './services/firebase/bank.service';
import { CommonModule } from '@angular/common';
import { BankCreationComponent } from './components/creation/bank.creation.component';

@NgModule({
  declarations: [HeaderComponent, BankDetailsComponent, BankCreationComponent],
  imports: [
    CommonModule,
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
