import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Property } from '../../../models/property.model';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CardModule, ButtonModule, DecimalPipe],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyCardComponent {
  @Input() property!: Property;

  constructor(private router: Router) {}

  onFavorite() {
    // Handle favorite logic
  }

  onViewDetails() {
    this.router.navigate(['/property-details'], { state: { property: this.property } });
  }
}
