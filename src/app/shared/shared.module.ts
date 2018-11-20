import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AuthGuard } from './guards/auth.guard';
import { AppState } from './state/app.state';

@NgModule({
  declarations: [],
  providers: [AuthGuard],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxsModule.forFeature([AppState])
  ],
  exports: []
})
export class SharedModule { }
