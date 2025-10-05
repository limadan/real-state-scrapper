import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MobileNavbarComponent } from "./components/mobile-navbar/mobile-navbar.component";
import { AuthService } from '../../pages/auth/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-main-layout',
  imports: [RouterOutlet, MenuModule, ButtonModule, MenubarModule, MobileNavbarComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'All homes',
        icon: 'pi pi-home',
        routerLink: '/',
      },
      {
        label: 'Favorites',
        icon: 'pi pi-heart',
        routerLink: '/favorites',
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        routerLink: '/app-settings',
      },
      {
        label: 'Logs',
        icon: 'pi pi-exclamation-circle',
        routerLink: '/app-logs',
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
    ];
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
