import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-pricing',
  imports: [],
  templateUrl: './pricing.html',
  styleUrl: './pricing.css',
})
export class Pricing implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.updateSeo({
      title: 'Pricing - Propirates',
      description:
        'Simple, transparent pricing for execution-first design mentorship. Choose the plan that fits your goals.',
      keywords: 'design mentorship pricing, UI design courses, design education cost',
    });
  }
}
