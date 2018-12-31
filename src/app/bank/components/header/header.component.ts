import { Component, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Bank } from 'src/app/models/bank';
import { User } from 'src/app/models/user';
import { AppState } from 'src/app/shared/state/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Select(AppState.currentBank) currentBank$: Observable<Bank>;
  @Select(AppState.currentUser) currentUser$: Observable<User>;

  @Input() title: string;
  @Input() backFunction: Function;

  constructor(private store: Store) { }

  copyMessage(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  share() {
    let navigator: any;

    navigator = window.navigator;

    if (navigator && navigator.share) {
      navigator.share({
        title: 'title',
        text: 'description',
        url: 'https://soch.in//',
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      this.copyMessage('AbraKadabra');
      alert('Der Link für die Einladung wurde in deine Zwischenablage gelegt. Du kannst ihn nun an den Empfänger schicken.');
    }

    // this.store.dispatch(new ShareYourBankAction);
  }

  back() {
    this.store.dispatch(this.backFunction());
    // this.store.dispatch(new RedirectToDashboardAction);
  }

}
