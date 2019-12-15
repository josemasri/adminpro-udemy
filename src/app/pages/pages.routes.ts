import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { LoginGuardGuard, AdminGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';

const pagesRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { titulo: 'Dashboard' },
    canActivate: [VerificaTokenGuard]
  },
  { path: 'progress', component: ProgressComponent, canActivate: [VerificaTokenGuard], data: { titulo: 'Progress' } },
  { path: 'graficas1', component: Graficas1Component, canActivate: [VerificaTokenGuard], data: { titulo: 'Graficas' } },
  { path: 'promesas', component: PromesasComponent, canActivate: [VerificaTokenGuard], data: { titulo: 'Promesas' } },
  { path: 'rxjs', component: RxjsComponent, canActivate: [VerificaTokenGuard], data: { titulo: 'RxJs' } },
  {
    path: 'account-settings', component: AccountSettingsComponent, canActivate: [VerificaTokenGuard], data: { titulo: 'Ajustes del tema' }
  },
  { path: 'perfil', component: ProfileComponent, canActivate: [VerificaTokenGuard], data: { titulo: 'Perfil de usuario' } },
  { path: 'busqueda/:termino', component: BusquedaComponent, canActivate: [VerificaTokenGuard], data: { titulo: 'Buscador' } },

  // Mantenimientos
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AdminGuard, VerificaTokenGuard],
    data: { titulo: 'Mantenimiento de usuarios' }
  },
  {
    path: 'hospitales', component: HospitalesComponent, canActivate: [VerificaTokenGuard], data: { titulo: 'Mantenimiento de hospitales' }
  },
  { path: 'medicos', component: MedicosComponent, canActivate: [VerificaTokenGuard], data: { titulo: 'Mantenimiento de medicos' } },
  { path: 'medico/:id', component: MedicoComponent, canActivate: [VerificaTokenGuard], data: { titulo: 'Actualizar médico' } },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
