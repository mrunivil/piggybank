import { Component, OnInit, Input } from '@angular/core';
import { Bank } from 'src/app/models/bank';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { RedirectToBankDetailsAction } from 'src/app/shared/state/actions';

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
    console.dir(this.item);
    this.store.dispatch(new RedirectToBankDetailsAction(this.item.id));
  }

}
