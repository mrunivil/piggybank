import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bank } from 'src/app/models/bank';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.scss']
})
export class BankListComponent {

  @Input() banks$: Observable<Bank[]>;
  constructor() { }

}
