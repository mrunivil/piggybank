import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BankDetailsComponent } from './components/details/bank.details.component';
import { BankCreationComponent } from './components/creation/bank.creation.component';

const routes: Routes = [
  {
    path: '',
    component: BankCreationComponent
  },
  {
    path: ':id',
    component: BankDetailsComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BankRoutingModule { }
