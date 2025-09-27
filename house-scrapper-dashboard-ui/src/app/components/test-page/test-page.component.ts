import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LlmAgentContainerComponent } from '../llm-agent/llm-agent-container.component';
import { BottomNavComponent } from '../navigation/bottom-nav/bottom-nav.component';
import { SideMenuComponent } from '../navigation/side-menu/side-menu.component';
import { PropertyCardComponent, Property } from '../properties/property-card/property-card.component';
import { PropertyDetailsComponent } from '../properties/property-details/property-details.component';
import { SearchCriteriaFormComponent } from '../settings/search-criteria-form/search-criteria-form.component';

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [
    LlmAgentContainerComponent,
    BottomNavComponent,
    SideMenuComponent,
    PropertyCardComponent,
    PropertyDetailsComponent,
    SearchCriteriaFormComponent
  ],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestPageComponent {
  mockProperty: Property = {
    id: 1,
    title: 'Beautiful Family Home',
    price: 450000,
    imageUrl: 'https://via.placeholder.com/300x200',
    address: '123 Main St, Anytown, USA',
    bedrooms: 3,
    bathrooms: 2,
    area: 2000,
    virtualTourUrl: 'https://example.com/tour'
  };

  onCriteriaSubmitted(criteria: any) {
    console.log('Search criteria submitted:', criteria);
  }
}
