import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Actions, ofActionSuccessful, Store, Select } from '@ngxs/store';
import { first, tap } from 'rxjs/operators';
import { LoginAction, LogoutAction } from './login/state/actions';
import { Bank } from './models/bank';
import { LoginSuccessfulEvent, LogoutSuccessfulEvent } from './shared/state/events';
import { AppState } from './shared/state/app.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PiggyBank';

  @Select(AppState.error) error$: Observable<Error>;

  constructor() { }


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
