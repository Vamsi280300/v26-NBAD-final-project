import { NgModule }            from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }     from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SummaryComponent }   from './pages/summary/summary.component';
import { ReportsComponent }   from './pages/reports/reports.component';
import { AuthGuard }          from './guards/auth.guard';

const routes: Routes = [
  { path: 'login',     component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'summary',   component: SummaryComponent,   canActivate: [AuthGuard] },
  { path: 'reports',   component: ReportsComponent,   canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
