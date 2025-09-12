import { Routes } from '@angular/router';
import { CultivationGroupsComponent } from './features/cultivation-groups/cultivation-groups.component';
import { CultivationsComponent } from './features/cultivations/cultivations.component';
import { VarietiesComponent } from './features/varieties/varieties.component';
import { HarmfulCausesComponent } from './features/harmful-causes/harmful-causes.component';
import { LoginComponent } from './features/auth/login.component';
import { authGuard } from './core/services/auth.guard';

// Θα προσθέσεις και τα άλλα components όταν τα φτιάξεις

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'groups', component: CultivationGroupsComponent },
  { path: 'cultivations', component: CultivationsComponent },
  { path: 'varieties', component: VarietiesComponent },
  { path: 'harmful-causes', component: HarmfulCausesComponent },
  { path: '', redirectTo: 'groups', pathMatch: 'full' }
];
