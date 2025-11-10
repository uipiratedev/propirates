import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[appTiltedCard]',
  standalone: true,
})
export class TiltedCardDirective implements OnInit, OnDestroy {
  @Input() tiltMaxAngle: number = 15; // Maximum tilt angle in degrees
  @Input() tiltScale: number = 1.05; // Scale on hover
  @Input() tiltSpeed: number = 400; // Transition speed in ms
  @Input() tiltPerspective: number = 1000; // Perspective value
  @Input() tiltGlare: boolean = true; // Enable/disable glare effect
  @Input() tiltGlareMaxOpacity: number = 0.3; // Maximum glare opacity

  private glareElement: HTMLElement | null = null;
  private isHovering: boolean = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.initializeCard();
  }

  ngOnDestroy(): void {
    if (this.glareElement && this.glareElement.parentNode) {
      this.glareElement.parentNode.removeChild(this.glareElement);
    }
  }

  private initializeCard(): void {
    const element = this.el.nativeElement;

    // Set initial styles
    this.renderer.setStyle(element, 'transform-style', 'preserve-3d');
    this.renderer.setStyle(element, 'transition', `transform ${this.tiltSpeed}ms ease-out`);
    this.renderer.setStyle(element, 'will-change', 'transform');

    // Create glare effect element if enabled
    if (this.tiltGlare) {
      this.createGlareElement();
    }
  }

  private createGlareElement(): void {
    const element = this.el.nativeElement;

    // Create glare overlay
    this.glareElement = this.renderer.createElement('div');
    this.renderer.addClass(this.glareElement, 'tilted-card-glare');

    // Set glare styles
    this.renderer.setStyle(this.glareElement, 'position', 'absolute');
    this.renderer.setStyle(this.glareElement, 'top', '0');
    this.renderer.setStyle(this.glareElement, 'left', '0');
    this.renderer.setStyle(this.glareElement, 'width', '100%');
    this.renderer.setStyle(this.glareElement, 'height', '100%');
    this.renderer.setStyle(this.glareElement, 'border-radius', 'inherit');
    this.renderer.setStyle(this.glareElement, 'pointer-events', 'none');
    this.renderer.setStyle(this.glareElement, 'opacity', '0');
    this.renderer.setStyle(
      this.glareElement,
      'background',
      'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8), transparent 50%)'
    );
    this.renderer.setStyle(
      this.glareElement,
      'transition',
      `opacity ${this.tiltSpeed}ms ease-out`
    );

    // Ensure parent has position relative
    const position = window.getComputedStyle(element).position;
    if (position === 'static') {
      this.renderer.setStyle(element, 'position', 'relative');
    }

    // Ensure overflow is hidden to contain glare
    this.renderer.setStyle(element, 'overflow', 'hidden');

    // Append glare to element
    this.renderer.appendChild(element, this.glareElement);
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isHovering = true;
    const element = this.el.nativeElement;
    this.renderer.setStyle(element, 'transition', `transform ${this.tiltSpeed}ms ease-out`);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isHovering) return;

    const element = this.el.nativeElement;
    const rect = element.getBoundingClientRect();

    // Calculate mouse position relative to element center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;

    // Calculate rotation angles
    const rotateX = (-mouseY / (rect.height / 2)) * this.tiltMaxAngle;
    const rotateY = (mouseX / (rect.width / 2)) * this.tiltMaxAngle;

    // Apply transform
    this.renderer.setStyle(
      element,
      'transform',
      `perspective(${this.tiltPerspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${this.tiltScale}, ${this.tiltScale}, ${this.tiltScale})`
    );

    // Update glare position and opacity
    if (this.tiltGlare && this.glareElement) {
      const percentageX = ((event.clientX - rect.left) / rect.width) * 100;
      const percentageY = ((event.clientY - rect.top) / rect.height) * 100;

      this.renderer.setStyle(
        this.glareElement,
        'background',
        `radial-gradient(circle at ${percentageX}% ${percentageY}%, rgba(255, 255, 255, ${this.tiltGlareMaxOpacity}), transparent 50%)`
      );
      this.renderer.setStyle(this.glareElement, 'opacity', '1');
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isHovering = false;
    const element = this.el.nativeElement;

    // Reset transform with smooth transition
    this.renderer.setStyle(
      element,
      'transition',
      `transform ${this.tiltSpeed}ms ease-out`
    );
    this.renderer.setStyle(
      element,
      'transform',
      `perspective(${this.tiltPerspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
    );

    // Hide glare
    if (this.tiltGlare && this.glareElement) {
      this.renderer.setStyle(this.glareElement, 'opacity', '0');
    }
  }
}

