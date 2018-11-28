import { Component, OnInit, Input } from '@angular/core';
import { Bank } from 'src/app/models/bank';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-bank-item',
  templateUrl: './bank-item.component.html',
  styleUrls: ['./bank-item.component.scss']
})
export class BankItemComponent implements OnInit {

  @Input() item: Bank;

  constructor(private store: Store) { }

  ngOnInit() {
  }

  showDetails() {
    this.store.dispatch(new Navigate(['/bank', '5']));
  }

}
