import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { Property } from '../property-card/property-card.component';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [TabsModule, AccordionModule, ButtonModule, DecimalPipe],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyDetailsComponent {
  @Input() property!: Property;

  onContactAgent() {
    // Handle contact agent logic
  }

  onScheduleTour() {
    // Handle schedule tour logic
  }

  encodeURIComponent(value: string): string {
    return encodeURIComponent(value);
  }
}
