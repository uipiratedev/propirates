import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modal } from '../../../shared/components/modal';
import { TiltedCardDirective } from '../../../shared/directives/tilted-card.directive';

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
  imports: [CommonModule, Modal, TiltedCardDirective],
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
    'A portfolio that looks <span class="text-primary font-semibold">senior and experienced</span>',
    '<span class="text-primary font-semibold">Confidence to work </span> with clients or teams',
    'Practical and user-centric <span class="text-primary font-semibold">product mindset</span>',
    'Real-world <span class="text-primary font-semibold">output</span> (not classroom theory)',
    'Work discipline, structure, clarity and <span class="text-primary font-semibold">decision–making</span>',
    '<span class="text-primary font-semibold">Independent and accountable</span> – no spoon feeding',
  ];

  // Section 1 - Reasons professionals join
  joinReasons = [
    'Get <span class="text-primary font-semibold">Unstuck</span>',
    'Upgrade <span class="text-primary font-semibold">Portfolio</span>',
    'Learn <span class="text-primary font-semibold">Clean Delivery</span>',
    'Handle Real <span class="text-primary font-semibold">Teamwork</span>',
    'Build <span class="text-primary font-semibold">Confidence</span>',
    'Boost <span class="text-primary font-semibold">Growth</span>',
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
      heading: 'Quick Screening (1–2 minutes)',
      subHeding:
        'You fill a short form. Choose your track (UI/UX Design or UI Development), tell us who you are, and   <span class="text-primary">why you want this',
      subtitle1: 'No long answers. No stories. Just truth.',
      subtitle2: '1',
      hoverBg: '#dd3500e6',
      textHover: '#fff',
    },
    {
      heading: 'Mindset & Ambition Round',
      subHeding:
        'We look at discipline, honesty, commitment, learning attitude, and clarity of goal.  to understand  <span class="text-primary">how serious you are.</span>',
      subtitle1: 'Sent only to shortlisted applicants within 24 hours',
      subtitle2: '2',
      hoverBg: '#8EF1F1E5',
      textHover: '#000',
    },
    {
      heading: '48-Hour Work Challenge',
      subHeding: 'Complete a small task for Design or Development, based on your selection. ',
      subtitle1: 'Execution > Perfection. We want people who can deliver, not talk.',
      subtitle2: '3',
      hoverBg: '#b0ddcae6',
      textHover: '#000',
    },
    {
      heading: 'Start Mentorship',
      subHeding:
        'If you pass, we begin our 6-week program  immediately, <span class="text-primary">even with a batch of 1.</span>',
      subtitle1: 'If you miss deadlines, copy work, lie, or make excuses. you`re out.',
      subtitle2: '4',
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
      text: '<span class="font-bold text-primary">100%   <br /> refund</span>',
    },
    {
      range: '30–45 days',
      text: '<span class="font-bold text-primary">50%   <br /> refund</span>',
    },
    {
      range: 'Up to 60 days',
      text: '<span class="font-bold text-primary">25%   <br /> refund</span>',
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
    {
      q: 'Will I get refund if I am already working?',
      a: 'Perfect. Ship a freelance task, internal delivery, or get a new role — refund applies as per ladder.',
    },
    {
      q: 'I’m a student. Can I afford this?',
      a: 'Yes. Top applicants can earn 30–50% scholarship. And if you land a paid internship or gig within 60 days, you earn the fee back.',
    },
    {
      q: 'Why charge a fee at all?',
      a: 'Free things are ignored. This is a commitment fee. It makes people show up, finish, and perform like professionals.',
    },
    {
      q: 'Is refund guaranteed?',
      a: 'No. Real world isn’t guaranteed. We select for hunger and discipline, then coach you to deliver.',
    },
    {
      q: 'What kills my refund eligibility?',
      a: 'Plagiarism, disappearing, quitting, or missing deadlines without communication.',
    },
  ];
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Modal state management
  showLearnMoreModal = false;
  learnMoreModalType: 'free' | 'paid' | 'scholarship' = 'free';

  /**
   * Opens the Learn More modal with specific pricing details
   * @param type - The type of pricing plan to show details for
   */
  openLearnMoreModal(type: 'free' | 'paid' | 'scholarship'): void {
    this.learnMoreModalType = type;
    this.showLearnMoreModal = true;
  }

  /**
   * Closes the Learn More modal
   */
  closeLearnMoreModal(): void {
    this.showLearnMoreModal = false;
  }

  /**
   * Gets the modal title based on the selected type
   */
  getModalTitle(): string {
    switch (this.learnMoreModalType) {
      case 'free':
        return 'Free Advice - Details';
      case 'paid':
        return 'Full Mentorship - Details';
      case 'scholarship':
        return 'Scholarship for Students';
      default:
        return 'Pricing Details';
    }
  }
}
