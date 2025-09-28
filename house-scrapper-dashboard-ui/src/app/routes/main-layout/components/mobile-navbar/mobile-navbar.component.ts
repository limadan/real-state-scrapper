import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
    standalone: true,
    selector: 'app-mobile-navbar',
    imports: [MenubarModule, MenuModule, ButtonModule],
    templateUrl: './mobile-navbar.component.html',
    styleUrls: ['./mobile-navbar.component.scss'],
})
export class MobileNavbarComponent {
    items = input<MenuItem[]>();
}