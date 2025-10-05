import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Property } from '../../../models/property.model';
import { PropertyService } from '../../../services/property.service';

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
  @Output() favoriteChanged = new EventEmitter<Property>();

  constructor(private router: Router, private propertyService: PropertyService) {}

  onFavorite() {
    const newFavoriteStatus = !this.property.favorite;
    this.propertyService.toggleFavorite(this.property.id, newFavoriteStatus).subscribe({
      next: () => {
        this.property.favorite = newFavoriteStatus;
        this.favoriteChanged.emit(this.property);
      },
      error: (err) => {
        console.error('Error toggling favorite:', err);
      }
    });
  }

  onViewDetails() {
    this.router.navigate(['/property-details'], { state: { property: this.property } });
  }
}
