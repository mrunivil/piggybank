import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { AppState } from './shared/state/app.state';
import { Observable } from 'rxjs';
import { Bank } from './models/bank';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PiggyBank';

  @Select(AppState.currentBank) currentBank$: Observable<Bank>;

}
