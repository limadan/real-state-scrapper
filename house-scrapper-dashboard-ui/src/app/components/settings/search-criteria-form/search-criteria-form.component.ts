import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DecimalPipe } from '@angular/common';

interface SearchCriteria {
  location: string;
  minPrice: number;
  maxPrice: number;
  minBedrooms: number;
  maxBedrooms: number;
  minBathrooms: number;
  maxBathrooms: number;
  minArea: number;
  maxArea: number;
}

@Component({
  selector: 'app-search-criteria-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, SliderModule, SelectModule, ButtonModule, CardModule, DecimalPipe],
  templateUrl: './search-criteria-form.component.html',
  styleUrl: './search-criteria-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchCriteriaFormComponent {
  @Output() criteriaSubmitted = new EventEmitter<SearchCriteria>();

  searchForm: FormGroup;

  bedroomsOptions = Array.from({ length: 10 }, (_, i) => ({ label: `${i + 1}+`, value: i + 1 }));
  bathroomsOptions = Array.from({ length: 6 }, (_, i) => ({ label: `${i + 1}`, value: i + 1 }));

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      location: ['', Validators.required],
      minPrice: [0, Validators.min(0)],
      maxPrice: [1000000, Validators.min(0)],
      minBedrooms: [1],
      maxBedrooms: [5],
      minBathrooms: [1],
      maxBathrooms: [4],
      minArea: [0],
      maxArea: [5000]
    });
  }

  onSubmit() {
    if (this.searchForm.valid) {
      const criteria: SearchCriteria = this.searchForm.value;
      this.criteriaSubmitted.emit(criteria);
    }
  }

  resetForm() {
    this.searchForm.reset({
      location: '',
      minPrice: 0,
      maxPrice: 1000000,
      minBedrooms: 1,
      maxBedrooms: 5,
      minBathrooms: 1,
      maxBathrooms: 4,
      minArea: 0,
      maxArea: 5000
    });
  }
}
