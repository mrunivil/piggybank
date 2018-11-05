import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { AppState } from './state/app.state';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    NgxsModule.forFeature([AppState])
  ],
  exports: [HeaderComponent]
})
export class SharedModule { }
