import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { concat } from 'rxjs/operators';
import { Bank } from 'src/app/models/bank';
import { BankSelectionChangedEvent, RedirectToBankDetailsAction } from 'src/app/shared/state/actions';

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
    this.store.dispatch(new BankSelectionChangedEvent(this.item)).pipe(
      concat(this.store.dispatch(new RedirectToBankDetailsAction))
    )
  }

}
