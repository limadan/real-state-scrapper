import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-email-listing-form',
  imports: [ReactiveFormsModule, CardModule, InputTextModule, TableModule, ButtonModule],
  templateUrl: './email-listing-form.html',
  styleUrl: './email-listing-form.scss'
})
export class EmailListingForm {
  emailInput = new FormControl<string>('');
  emails: string[] = ['user1@example.com', 'user2@example.com'];
}
