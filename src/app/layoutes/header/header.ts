import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  isMenuOpen = false;

  currentUser = this.authService.currentUser;
  isLoggedIn = computed(() => !!this.currentUser());

  constructor() {
    console.log("currentUser", this.currentUser);
    console.log("isLoggedIn", this.isLoggedIn());

  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.isMenuOpen = false;
    this.router.navigate(['/login']);
    this.currentUser.set(null);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.isMenuOpen = false;
  }
}
