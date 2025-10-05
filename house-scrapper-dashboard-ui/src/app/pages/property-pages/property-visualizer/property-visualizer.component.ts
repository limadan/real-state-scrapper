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
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-property-visualizer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PropertyCardComponent, ButtonModule, CardModule, InputNumberModule, SelectModule, InputTextModule, PanelModule],
  templateUrl: './property-visualizer.component.html',
  styleUrls: ['./property-visualizer.component.scss']
})
export class PropertyVisualizerComponent implements OnInit {
  filterForm!: FormGroup;
  properties: Property[] = [];
  filteredProperties: Property[] = [];
  loading = false;
  error: string | null = null;
  currentPage = 1;
  pageSize = 50;

  constructor(private fb: FormBuilder, private propertyService: PropertyService) {}

  ngOnInit() {
    this.filterForm = this.fb.group({
      minPrice: [null],
      maxPrice: [null],
      bedrooms: [null],
      parking: [null],
      location: ['']
    });

    this.loadProperties();

    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  loadProperties() {
    this.loading = true;
    this.error = null;
    this.propertyService.getAllProperties().subscribe({
      next: (properties) => {
        this.properties = properties;
        this.filteredProperties = [...properties];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load properties';
        this.loading = false;
        console.error('Error loading properties:', err);
      }
    });
  }

  private applyFilters() {
    const filters = this.filterForm.value;
    this.filteredProperties = this.properties.filter(property => {
      const matchesMinPrice = !filters.minPrice || property.price >= filters.minPrice;
      const matchesMaxPrice = !filters.maxPrice || property.price <= filters.maxPrice;
      const matchesBedrooms = !filters.bedrooms || property.number_of_rooms >= filters.bedrooms;
      const matchesParking = !filters.parking || (property.number_of_parking_spaces || 0) >= filters.parking;
      const matchesLocation = !filters.location || property.address.toLowerCase().includes(filters.location.toLowerCase());
      return matchesMinPrice && matchesMaxPrice && matchesBedrooms && matchesParking && matchesLocation;
    });
  }

  trackByPropertyId(index: number, property: Property): number {
    return property.id;
  }

  onFavoriteChanged(updatedProperty: Property) {
    const index = this.properties.findIndex(p => p.id === updatedProperty.id);
    if (index !== -1) {
      this.properties[index] = updatedProperty;
      this.applyFilters(); // Re-apply filters to update filtered list
    }
  }

  loadMore() {
    this.currentPage++;
    this.loading = true;
    this.propertyService.getAllProperties(this.currentPage, this.pageSize).subscribe({
      next: (newProperties) => {
        this.properties = [...this.properties, ...newProperties];
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load more properties';
        this.loading = false;
        console.error('Error loading more properties:', err);
      }
    });
  }
}
