import { Component, OnInit, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { DashboardState } from '../../state/dashboard.state';
import { Observable } from 'rxjs';
import { Bank } from 'src/app/models/bank';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.scss']
})
export class BankListComponent implements OnInit {

  @Input() banks$: Observable<Bank[]>

  constructor() { }

  ngOnInit() {
  }

}
