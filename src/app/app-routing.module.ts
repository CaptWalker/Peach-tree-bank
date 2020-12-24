import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { 
  AuthGuardService as AuthGuard 
} from './services/auth-guard.service';

const routes: Routes = [
  {
    path:'',
    component: LoginComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard] 
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
