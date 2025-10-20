import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { SharedModule } from './shared.module';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, // Adicionar CommonModule aqui
    RouterModule,
    SharedModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'VidaPlus';
  isAuthenticated: boolean = false;

  constructor(private router: Router) {
    this.checkAuthentication();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkAuthentication();
    });
  }

  checkAuthentication() {
    this.isAuthenticated = !!localStorage.getItem('auth_token');
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('isLoggedIn');
    this.checkAuthentication();
    this.router.navigate(['/login']);
  }
}
