import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { AuthGuard } from './guards/auth.guard';
import { AppState } from './state/app.state';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AngularFireModule } from '@angular/fire';

@NgModule({
  declarations: [],
  providers: [AuthGuard],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    NgxsModule.forFeature([AppState])
  ],
  exports: []
})
export class SharedModule {}
