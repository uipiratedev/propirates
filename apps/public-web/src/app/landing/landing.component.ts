import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CardData {
  heading: string;
  subHeding: string;
  subtitle1: string;
  subtitle2: string;
  hoverBg: string;
  textHover: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  // readonly APPLY_LINK = 'https://forms.gle/your-form-id'; // Replace with your Google Form URL
  readonly APPLY_LINK = '/start-application';
  readonly START_DATE = 'Starts Nov 15'; // Update as needed
  readonly PRICE = '$199'; // Update if needed
  readonly currentYear = new Date().getFullYear();

  badges = [
    { label: '🌍 Global + English' },
    { label: '🎯 Limited seats' },
    { label: '🚀 Starts Nov 15' },
  ];

  readonly whoIsThisFor = [
    {
      title1: 'Students',
      title2: 'learning design or development',
    },
    {
      title1: 'Working professionals',
      title2: 'who need direction or stuck in slow growth',
    },
    {
      title1: 'Designers',
      title2: 'who want to look experienced',
    },
    {
      title1: 'Developers',
      title2: 'who can code, but can’t ship polished UI',
    },
    {
      title1: 'Freelancers  and agencies',
      title2: 'who want bigger clients & higher pricing',
    },
    {
      title1: 'Career switchers',
      title2: 'with discipline and hunger',
    },
  ];

  //
  selectedTrack: 'design' | 'development' | null = null;

  selectTrack(track: 'design' | 'development') {
    this.selectedTrack = track;
  }

  // What is the outcome
  outcomes = [
    'A portfolio that looks <span class="text-green-700 font-semibold">senior and experienced</span>',
    'Confidence to work with clients or teams',
    'Practical and user-centric <span class="text-green-700 font-semibold">product mindset</span>',
    'Real-world <span class="text-green-700 font-semibold">output</span> (not classroom theory)',
    'Work discipline, structure, clarity and <span class="text-green-700 font-semibold">decision–making</span>',
    '<span class="text-green-700 font-semibold">Independent and accountable</span> – no spoon feeding',
  ];

  // Section 1 - Reasons professionals join
  joinReasons = [
    'Get <span class="text-green-700 font-semibold">Unstuck</span>',
    'Upgrade <span class="text-green-700 font-semibold">Portfolio</span>',
    'Learn <span class="text-green-700 font-semibold">Clean Delivery</span>',
    'Handle Real <span class="text-green-700 font-semibold">Teamwork</span>',
    'Build <span class="text-green-700 font-semibold">Confidence</span>',
    'Boost <span class="text-green-700 font-semibold">Growth</span>',
  ];

  // Section 2 - Success stories / Do not apply list
  dontApplyReasons = [
    'You want comfort',
    'You need reminders',
    'You expect hand-holding',
    'You only want certificates',
    'You hate feedback',
    'You can’t handle pressure',
  ];

  // Section 3 - Do not apply if
  hoveredIndex: number | null = null;

  data: CardData[] = [
    {
      heading: '50+',
      subHeding: 'From MVPs to complex dashboards, shipped across 6 countries',
      subtitle1: 'Projects',
      subtitle2: 'Completed',
      hoverBg: '#dd3500e6',
      textHover: '#fff',
    },
    {
      heading: '20+',
      subHeding: 'Including AI tools, HR platforms, fintech apps, and B2B SaaS products',
      subtitle1: 'Enterprise',
      subtitle2: 'Clients',
      hoverBg: '#8EF1F1E5',
      textHover: '#000',
    },
    {
      heading: '20+',
      subHeding: 'SaaS, EdTech, FinTech, HealthTech, LegalTech, Creator Economy, and more',
      subtitle1: 'Industries',
      subtitle2: 'Served',
      hoverBg: '#b0ddcae6',
      textHover: '#000',
    },
    {
      heading: '9+',
      subHeding: 'Built for scale, speed, and seamless handoff to developers',
      subtitle1: 'Years of',
      subtitle2: 'Experience',
      hoverBg: '#f4e342e6',
      textHover: '#000',
    },
  ];

  handleMouseEnter(index: number) {
    this.hoveredIndex = index;
  }

  handleMouseLeave() {
    this.hoveredIndex = null;
  }

  // refunds
  refunds = [
    {
      range: '15–30 days',
      text: 'Job offer or paid client in 15–30 days post-program → <span class="font-semibold text-green-700">100% refund</span>',
    },
    {
      range: '30–45 days',
      text: 'Job/client within 30–45 days → <span class="font-semibold text-green-700">50% refund</span>',
    },
    {
      range: 'Up to 60 days',
      text: 'Success within 60 days → <span class="font-semibold text-green-700">25% refund</span>. After 60 days, refund isn’t guaranteed, but support continues.',
    },
  ];

  readonly whatYouWillDo = [
    {
      title: 'Build a complete SaaS product',
      desc: 'Brief → research → flows → wireframes → system → UI → prototype. Learn to think and deliver like a product designer.',
    },
    {
      title: 'Redesign an enterprise app',
      desc: 'Choose a real, widely-used product. Identify UX problems, propose improvements, and ship a defensible redesign.',
    },
    {
      title: 'Make a portfolio that looks experienced',
      desc: 'Case studies that read like real work. No Dribbble fluff. Show decisions, constraints, and outcomes.',
    },
  ];

  readonly refundPolicy = [
    {
      title: '15–20 days',
      desc: 'Job offer or paid client in 15–20 days post-program → 100% refund.',
      highlight: '100% refund',
    },
    {
      title: '30–45 days',
      desc: 'Job/client within 30–45 days → 100% refund.',
      highlight: '100% refund',
    },
    {
      title: 'Up to 60 days',
      desc: "Success within 60 days → 100% refund. After 60 days, refunds aren't guaranteed, but support continues.",
      highlight: '100% refund',
    },
  ];

  readonly faqs = [
    {
      q: 'Is this beginner-friendly?',
      a: "Yes, if you're serious. You must show any attempt at work and commit ≥6 hours/week.",
    },
    {
      q: 'Are there recordings?',
      a: "No. It's live/async, feedback-first. You learn by shipping.",
    },
    {
      q: 'Do you guarantee jobs?',
      a: 'No. We guarantee standards, mentorship, and a portfolio that earns respect. Refunds are performance-based.',
    },
    {
      q: 'How do I start?',
      a: 'Apply → complete 48-hour task → if accepted, we start immediately (even with a batch of 1).',
    },
  ];
}
