import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { RedirectToDashboardAction } from 'src/app/shared/state/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() title: string;

  constructor(private store: Store) { }

  back() {
    this.store.dispatch(new RedirectToDashboardAction);
  }

}
