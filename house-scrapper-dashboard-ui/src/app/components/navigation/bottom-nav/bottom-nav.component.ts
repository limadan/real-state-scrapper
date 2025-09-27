import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MenuItem } from 'primeng/api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [ButtonModule, TooltipModule, RouterLink],
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomNavComponent {
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
    }
  ];
}
