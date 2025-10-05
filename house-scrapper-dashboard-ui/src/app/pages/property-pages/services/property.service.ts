import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getAllProperties(page: number = 1, size: number = 50): Observable<Property[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Property[]>(`${this.apiUrl}/properties`, { params });
  }

  getFavoriteProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/properties/favorites`);
  }

  toggleFavorite(propertyId: number, favorite: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/properties/${propertyId}/favorite`, { favorite });
  }
}
