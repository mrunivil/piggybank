import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankCreationComponent } from './components/creation/bank.creation.component';
import { BankDetailsComponent } from './components/details/bank.details.component';

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
