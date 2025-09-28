import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { PropertyCardComponent } from './components/property-card/property-card.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { Property } from '../models/property.model';

@Component({
  selector: 'app-property-visualizer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PropertyCardComponent, ButtonModule, CardModule, InputNumberModule, SelectModule, InputTextModule, PanelModule],
  templateUrl: './property-visualizer.component.html',
  styleUrls: ['./property-visualizer.component.scss']
})
export class PropertyVisualizerComponent implements OnInit {
  filterForm!: FormGroup;
  filteredProperties: Property[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.filterForm = this.fb.group({
      minPrice: [null],
      maxPrice: [null],
      bedrooms: [null],
      parking: [null],
      location: ['']
    });

    this.filteredProperties = [...this.properties];

    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  private applyFilters() {
    const filters = this.filterForm.value;
    this.filteredProperties = this.properties.filter(property => {
      const matchesMinPrice = !filters.minPrice || property.price >= filters.minPrice;
      const matchesMaxPrice = !filters.maxPrice || property.price <= filters.maxPrice;
      const matchesBedrooms = !filters.bedrooms || property.bedrooms >= filters.bedrooms;
      const matchesParking = !filters.parking || property.parking >= filters.parking;
      const matchesLocation = !filters.location || property.address.toLowerCase().includes(filters.location.toLowerCase());
      return matchesMinPrice && matchesMaxPrice && matchesBedrooms && matchesParking && matchesLocation;
    });
  }

  // Mock properties data for placeholders
  properties: Property[] = [
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
    },
    {
      id: 4,
      imageUrl: 'https://content.loft.com.br/homes/1qyin2g/banner_thumbnail.jpg',
      title: 'Studio Loft',
      address: '101 Pine Rd, Metro',
      price: 180000,
      bedrooms: 1,
      bathrooms: 1,
      area: 600,
      parking: 0,
      virtualTourUrl: 'https://loft.com.br/imovel/loft-studio-101-pine-rd'
    },
    {
      id: 5,
      imageUrl: 'https://content.loft.com.br/homes/17hu24c/banner_thumbnail.jpg',
      title: 'Family Home',
      address: '202 Maple Ln, Suburb',
      price: 420000,
      bedrooms: 4,
      bathrooms: 2,
      area: 1600,
      parking: 2,
      virtualTourUrl: 'https://loft.com.br/imovel/casa-familiar-202-maple-ln'
    },
    {
      id: 6,
      imageUrl: 'https://content.loft.com.br/homes/1n9unus/banner_thumbnail.jpg',
      title: 'Penthouse Suite',
      address: '303 Cedar Blvd, Downtown',
      price: 750000,
      bedrooms: 3,
      bathrooms: 3,
      area: 1800,
      parking: 2,
      virtualTourUrl: 'https://loft.com.br/imovel/cobertura-penthouse-303-cedar-blvd'
    }
  ];
}
