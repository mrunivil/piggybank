import { Component, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Bank } from 'src/app/models/bank';
import { User } from 'src/app/models/user';
import { RedirectToDashboardAction, RedirectToBankDetailsAction } from 'src/app/shared/state/actions';
import { AppState } from 'src/app/shared/state/app.state';
import { BankState } from 'src/app/bank/state/bank.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() title: string;

  constructor(private store: Store) { }

  back() {
    this.store.dispatch(new RedirectToBankDetailsAction);
  }

}
