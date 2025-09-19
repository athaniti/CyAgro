import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CultivationGroupsComponent } from './features/cultivation-groups/cultivation-groups.component';
import { CultivationsComponent } from './features/cultivations/cultivations.component';
import { VarietiesComponent } from './features/varieties/varieties.component';
import { HarmfulCausesComponent } from './features/harmful-causes/harmful-causes.component';
import { LoginComponent } from './features/auth/login.component';
import { authGuard } from './core/services/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'groups', component: CultivationGroupsComponent, canActivate: [authGuard] },
  { path: 'cultivations', component: CultivationsComponent, canActivate: [authGuard] },
  { path: 'varieties', component: VarietiesComponent, canActivate: [authGuard] },
  { path: 'harmful-causes', component: HarmfulCausesComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
