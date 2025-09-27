import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [ButtonModule, MenuModule, TooltipModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideMenuComponent {
  sidebarVisible = false;

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/dashboard'
    },
    {
      label: 'Properties',
      icon: 'pi pi-building',
      routerLink: '/properties'
    },
    {
      label: 'Search',
      icon: 'pi pi-search',
      routerLink: '/search'
    },
    {
      label: 'Emails',
      icon: 'pi pi-envelope',
      routerLink: '/emails'
    },
  ];

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
