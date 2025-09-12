import { Component } from '@angular/core';
import { RouterModule, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './core/services/auth.service';
import { inject } from '@angular/core';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule],
    templateUrl: './app.component.html'
  })
  export class AppComponent {
    constructor(
      public auth: AuthService,
      private router: Router
    ) {}
  
    logout() {
      this.auth.logout();
      this.router.navigate(['/login']);
    }
  }