import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BankItemComponent } from './components/bank-item/bank-item.component';
import { BankListComponent } from './components/bank-list/bank-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    BankListComponent,
    BankItemComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
