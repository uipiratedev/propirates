import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface SeoData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private router = inject(Router);

  private defaultSeo: SeoData = {
    title: 'Propirates - Execution-First Design Mentorship',
    description:
      'Learn UI design through real projects, not tutorials. Get mentorship from experienced designers and build your portfolio.',
    keywords: 'UI design, mentorship, design education, portfolio, UX design',
    image: 'https://propirates.com/og-image.jpg',
    type: 'website',
    author: 'Propirates',
  };

  constructor() {
    // Auto-update SEO on route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // Reset to default on route change
        // Individual pages can override by calling updateSeo()
        this.updateSeo(this.defaultSeo);
      });
  }

  /**
   * Update SEO meta tags
   */
  updateSeo(data: SeoData): void {
    const seoData = { ...this.defaultSeo, ...data };

    // Update title
    if (seoData.title) {
      this.titleService.setTitle(seoData.title);
    }

    // Update meta tags
    if (seoData.description) {
      this.metaService.updateTag({
        name: 'description',
        content: seoData.description,
      });
    }

    if (seoData.keywords) {
      this.metaService.updateTag({
        name: 'keywords',
        content: seoData.keywords,
      });
    }

    if (seoData.author) {
      this.metaService.updateTag({ name: 'author', content: seoData.author });
    }

    // Open Graph tags
    if (seoData.title) {
      this.metaService.updateTag({ property: 'og:title', content: seoData.title });
    }

    if (seoData.description) {
      this.metaService.updateTag({
        property: 'og:description',
        content: seoData.description,
      });
    }

    if (seoData.image) {
      this.metaService.updateTag({ property: 'og:image', content: seoData.image });
    }

    if (seoData.url) {
      this.metaService.updateTag({ property: 'og:url', content: seoData.url });
    }

    if (seoData.type) {
      this.metaService.updateTag({ property: 'og:type', content: seoData.type });
    }

    // Twitter Card tags
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });

    if (seoData.title) {
      this.metaService.updateTag({ name: 'twitter:title', content: seoData.title });
    }

    if (seoData.description) {
      this.metaService.updateTag({
        name: 'twitter:description',
        content: seoData.description,
      });
    }

    if (seoData.image) {
      this.metaService.updateTag({ name: 'twitter:image', content: seoData.image });
    }
  }

  /**
   * Update canonical URL
   */
  updateCanonicalUrl(url: string): void {
    let link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']");

    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }

  /**
   * Add structured data (JSON-LD)
   */
  addStructuredData(data: Record<string, unknown>): void {
    let script: HTMLScriptElement | null = document.querySelector(
      'script[type="application/ld+json"]'
    );

    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);
  }

  /**
   * Remove structured data
   */
  removeStructuredData(): void {
    const script = document.querySelector('script[type="application/ld+json"]');
    if (script) {
      script.remove();
    }
  }
}

