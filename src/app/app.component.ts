import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { AppState } from './shared/state/app.state';
import { Token } from './models/token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PiggyBank';
  tokens$: Observable<Token[]>;

  @Select(AppState.error) error$: Observable<Error>;

  constructor() {
    this.loadInvites();
  }

  async loadInvites() {
    const res = await fetch('http://localhost:3000/token');
    this.tokens$ = of(<Token[]>await res.json());
  }

  async reset() {
    // const res = await fetch('http://localhost:3000/banks');
    // console.dir(await res.json());
    // debugger
    //     res.forEach(bank => {
    //       this.http.delete('http://localhost:3000/banks/' + bank.id).pipe(first()).subscribe();
    //     });
    // )
    // this.http.get('http://localhost:3000/bank_history').subscribe(
    //   (res: Bank[]) => {
    //     res.forEach(bank => {
    //       this.http.delete('http://localhost:3000/bank_history/' + bank.id).pipe(first()).subscribe();
    //     });
    //   }
    // )
    // this.http.get('http://localhost:3000/bank_users').subscribe(
    //   (res: Bank[]) => {
    //     res.forEach(bank => {
    //       this.http.delete('http://localhost:3000/bank_users/' + bank.id).pipe(first()).subscribe();
    //     });
    //   }
    // )
    // this.http.get('http://localhost:3000/user_banks').subscribe(
    //   (res: Bank[]) => {
    //     res.forEach(bank => {
    //       this.http.delete('http://localhost:3000/user_banks/' + bank.id).pipe(first()).subscribe();
    //     });
    //   }
    // )
  }

}
