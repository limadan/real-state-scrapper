import { Component } from '@angular/core';
import { SearchCriteriaFormComponent } from './search-criteria-form/search-criteria-form.component';
import { EmailListingForm } from './email-listing-form/email-listing-form';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-app-settings',
  standalone: true,
  imports: [SearchCriteriaFormComponent, EmailListingForm, CardModule, ButtonModule, ToastModule],
  templateUrl: './app-settings.component.html',
  styleUrl: './app-settings.component.scss',
  providers: [MessageService]
})
export class AppSettingsComponent {
  constructor(private router: Router, private messageService: MessageService) {}

  logout() {
    localStorage.removeItem('authToken');
    this.messageService.add({
      severity: 'info',
      summary: 'Logged Out',
      detail: 'You have been logged out successfully.'
    });
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }
}
