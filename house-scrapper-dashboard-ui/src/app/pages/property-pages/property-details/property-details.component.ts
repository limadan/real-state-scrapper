import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { LlmAgentContainerComponent } from './llm-agent/llm-agent-container.component';
import { Property } from '../models/property.model';
import { SafePipe } from '../pipes/safe.pipe';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [TabsModule, ButtonModule, DecimalPipe, LlmAgentContainerComponent, SafePipe],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyDetailsComponent implements OnInit {
  property!: Property;

  router = inject(Router);

  ngOnInit() {
    this.property = history.state.property;
  }

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
