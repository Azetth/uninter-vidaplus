import { Routes } from '@angular/router';
import { TeleconsultationComponent } from './pages/teleconsultation/teleconsultation.component';
import { SchedulingComponent } from './pages/scheduling/scheduling.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PatientRegistrationComponent } from './pages/patient-registration/patient-registration.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'patient-registration', component: PatientRegistrationComponent, canActivate: [authGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'scheduling', component: SchedulingComponent, canActivate: [authGuard] },
    { path: 'teleconsultation', component: TeleconsultationComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
