import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

export interface Property {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  virtualTourUrl?: string;
}

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

  onFavorite() {
    // Handle favorite logic
  }

  onViewDetails() {
    // Handle view details logic
  }
}
