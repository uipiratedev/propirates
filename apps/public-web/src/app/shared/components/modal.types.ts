/**
 * Modal size options
 */
export type ModalSize = 'small' | 'medium' | 'large' | 'extraLarge';

/**
 * Modal button variant types
 */
export type ModalButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

/**
 * Configuration for a modal button
 */
export interface ModalButton {
  /**
   * Button label text
   */
  label: string;

  /**
   * Button variant/style
   * @default 'secondary'
   */
  variant?: ModalButtonVariant;

  /**
   * Callback function when button is clicked
   * Return false to prevent modal from closing
   */
  onClick?: () => boolean | void | Promise<boolean | void>;

  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom CSS classes to apply to the button
   */
  customClass?: string;

  /**
   * Whether this button should close the modal by default
   * @default true
   */
  closeOnClick?: boolean;
}

/**
 * Main modal configuration interface
 */
export interface ModalConfig {
  /**
   * Modal title/header text
   */
  title?: string;

  /**
   * Modal body content (plain text)
   * Use content projection for custom templates
   */
  content?: string;

  /**
   * Modal size
   * @default 'medium'
   */
  size?: ModalSize;

  /**
   * Whether to show the close button (X) in the header
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Whether clicking the backdrop closes the modal
   * @default true
   */
  closeOnBackdropClick?: boolean;

  /**
   * Whether pressing ESC key closes the modal
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Custom footer buttons
   * If not provided, a default "Close" button will be shown
   */
  buttons?: ModalButton[];

  /**
   * Custom CSS class for the modal container
   */
  customClass?: string;

  /**
   * Custom CSS class for the modal content area
   */
  contentClass?: string;

  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string;

  /**
   * ARIA described by ID for accessibility
   */
  ariaDescribedBy?: string;
}

/**
 * Modal animation state
 */
export type ModalAnimationState = 'void' | 'enter' | 'leave';
