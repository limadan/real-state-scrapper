import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Property } from '../../../models/property.model';

@Component({
  selector: 'app-favorite-card',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss']
})
export class FavoriteCardComponent {
  @Input() property!: Property;
  @Output() unfavorite = new EventEmitter<Property>();

  constructor(private router: Router) {}

  onViewDetails() {
    this.router.navigate(['/property-details'], { state: { property: this.property } });
  }

  onUnfavorite() {
    this.unfavorite.emit(this.property);
  }

  onOpenWebsite() {
    if (this.property.access_link) {
      window.open(this.property.access_link, '_blank');
    }
  }
}
