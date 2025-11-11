import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit, OnDestroy {
  private seoService = inject(SeoService);

  readonly currentYear = new Date().getFullYear();

  // Team statistics
  stats = [
    { value: '500+', label: 'Students Mentored', icon: '👥' },
    { value: '95%', label: 'Success Rate', icon: '🎯' },
    { value: '6-8', label: 'Week Program', icon: '⏱️' },
    { value: '100%', label: 'Real Projects', icon: '🚀' },
  ];

  // Core values
  values = [
    {
      icon: 'https://res.cloudinary.com/damm9iwho/image/upload/v1762773415/jvlbsvaejdc3qynqvbcv.svg',
      title: 'Execution First',
      description:
        'We believe in learning by doing. No endless tutorials, just real work that builds real skills.',
    },
    {
      icon: 'https://res.cloudinary.com/damm9iwho/image/upload/v1762846639/lmndv8wudzixjjvooivz.svg',
      title: 'Results Driven',
      description:
        'Your success is measured by tangible outcomes: portfolio projects, skills gained, and career growth.',
    },
    {
      icon: 'https://res.cloudinary.com/damm9iwho/image/upload/v1762773382/yggbzca6z685vnulzvdu.svg',
      title: 'No Excuses',
      description:
        'We push you to deliver your best work. Discipline, commitment, and accountability are non-negotiable.',
    },
    {
      icon: 'https://res.cloudinary.com/damm9iwho/image/upload/v1762846823/lz4gk1slmi4o0askv9oe.svg',
      title: 'Elite Mentorship',
      description:
        'Learn from experienced designers who have shipped real products and built successful careers.',
    },
  ];

  // Key features
  features = [
    {
      title: 'Real-World Projects',
      description:
        'Work on actual client projects, not fake case studies. Build a portfolio that stands out.',
      icon: 'https://res.cloudinary.com/damm9iwho/image/upload/v1762773779/dqt33bkxkc5mtjswrtwj.svg',
    },
    {
      title: 'Personal Mentorship',
      description: 'Get 1-on-1 guidance from industry professionals who care about your growth.',
      icon: 'https://res.cloudinary.com/damm9iwho/image/upload/v1762773415/laetlkfvkjqqvaodzftm.svg',
    },
    {
      title: 'Strict Selection',
      description: 'We only accept serious learners who are ready to commit and deliver results.',
      icon: 'https://res.cloudinary.com/damm9iwho/image/upload/v1762846821/kdexbbgzzi5m8h1gymof.svg',
    },
    {
      title: 'Career Support',
      description: 'From portfolio reviews to interview prep, we help you land your dream role.',
      icon: 'https://res.cloudinary.com/damm9iwho/image/upload/v1762846823/l9wxej1fztcxy5grhhqk.svg',
    },
  ];

  ngOnInit(): void {
    // Update SEO meta tags
    this.seoService.updateSeo({
      title: 'About Us - Propirates | Execution-First Design Mentorship',
      description:
        'Learn about Propirates, the execution-first design mentorship program that transforms aspiring designers into industry professionals through real projects and elite mentorship.',
      keywords:
        'about propirates, design mentorship, UI design education, UX design training, design bootcamp, portfolio building, career development',
      url: 'https://propirates.com/about',
      type: 'website',
    });

    // Update canonical URL
    this.seoService.updateCanonicalUrl('https://propirates.com/about');

    // Add structured data (JSON-LD) for Organization
    this.seoService.addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Propirates',
      description:
        'Execution-first design mentorship program that helps aspiring designers build real-world skills through practical projects.',
      url: 'https://propirates.com',
      logo: 'https://propirates.com/logo.png',
      sameAs: [
        'https://twitter.com/propirates',
        'https://linkedin.com/company/propirates',
        'https://instagram.com/propirates',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        email: 'hello@propirates.com',
      },
      foundingDate: '2024',
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        value: '10-50',
      },
      areaServed: 'Worldwide',
      serviceType: 'Design Education & Mentorship',
    });
  }

  ngOnDestroy(): void {
    // Clean up structured data when component is destroyed
    this.seoService.removeStructuredData();
  }
}
