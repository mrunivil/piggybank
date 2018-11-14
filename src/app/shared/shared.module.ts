import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { AppState } from './state/app.state';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent],
  providers: [AuthGuard],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxsModule.forFeature([AppState])
  ],
  exports: [HeaderComponent]
})
export class SharedModule { }
