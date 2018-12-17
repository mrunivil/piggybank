import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'bank',
    loadChildren: './bank/bank.module#BankModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'invite',
    loadChildren: './invite/invite.module#InviteModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'preferences',
    loadChildren: './preferences/preferences.module#PreferencesModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: 'feedback',
    loadChildren: './feedback/feedback.module#FeedbackModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
