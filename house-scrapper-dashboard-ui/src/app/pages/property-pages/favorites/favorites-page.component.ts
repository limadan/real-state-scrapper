import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteCardComponent } from './components/favorite-card/favorite-card.component';
import { Property } from '../models/property.model';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [CommonModule, FavoriteCardComponent],
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent {
  favoriteProperties: Property[] = [
    {
      id: 1,
      imageUrl: 'https://content.loft.com.br/homes/xcm9zo/banner_thumbnail.jpg',
      title: 'Modern Apartment',
      address: '123 Main St, City',
      price: 250000,
      bedrooms: 2,
      bathrooms: 1,
      area: 800,
      parking: 1,
      virtualTourUrl: 'https://loft.com.br/imovel/apartamento-rua-gama-cerqueira-jardim-america-belo-horizonte-2-quartos-250m2/1n0ckjv?tipoTransacao=venda'
    },
    {
      id: 2,
      imageUrl: 'https://content.loft.com.br/homes/12afj74/banner_thumbnail.jpg',
      title: 'Cozy House',
      address: '456 Elm St, Town',
      price: 350000,
      bedrooms: 3,
      bathrooms: 2,
      area: 1200,
      parking: 2,
      virtualTourUrl: 'https://loft.com.br/imovel/casa-confortavel-456-elm-st'
    },
    {
      id: 3,
      imageUrl: 'https://content.loft.com.br/homes/ys74s3/banner_thumbnail.jpg',
      title: 'Luxury Villa',
      address: '789 Oak Ave, Village',
      price: 500000,
      bedrooms: 4,
      bathrooms: 3,
      area: 2000,
      parking: 3,
      virtualTourUrl: 'https://loft.com.br/imovel/vila-luxuosa-789-oak-ave'
    }
  ];

  onUnfavorite(property: Property) {
    this.favoriteProperties = this.favoriteProperties.filter(p => p.id !== property.id);
  }
}
