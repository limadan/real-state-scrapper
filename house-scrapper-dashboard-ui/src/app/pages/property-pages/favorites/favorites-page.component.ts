import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteCardComponent } from './components/favorite-card/favorite-card.component';
import { Property } from '../models/property.model';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [CommonModule, FavoriteCardComponent],
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent implements OnInit {
  favoriteProperties: Property[] = [];
  loading = false;
  error: string | null = null;

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.loadFavoriteProperties();
  }

  loadFavoriteProperties() {
    this.loading = true;
    this.error = null;
    this.propertyService.getFavoriteProperties().subscribe({
      next: (properties) => {
        this.favoriteProperties = properties;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load favorite properties';
        this.loading = false;
        console.error('Error loading favorite properties:', err);
      }
    });
  }

  onUnfavorite(property: Property) {
    this.propertyService.toggleFavorite(property.id, false).subscribe({
      next: () => {
        this.loadFavoriteProperties(); // Refresh the list
      },
      error: (err) => {
        console.error('Error unfavoriting property:', err);
        // Optionally show error message to user
      }
    });
  }
}
