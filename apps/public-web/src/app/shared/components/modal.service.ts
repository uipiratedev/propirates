import { Injectable, ComponentRef, ApplicationRef, createComponent, EnvironmentInjector, Type } from '@angular/core';
import { Modal } from './modal';
import { ModalConfig } from './modal.types';

/**
 * Service for programmatically creating and managing modals
 */
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalRefs: ComponentRef<Modal>[] = [];

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  /**
   * Opens a modal with the given configuration
   * @param config Modal configuration
   * @returns ComponentRef of the created modal
   */
  open(config: ModalConfig): ComponentRef<Modal> {
    // Create the modal component
    const modalRef = createComponent(Modal, {
      environmentInjector: this.injector,
    });

    // Configure the modal
    const modalInstance = modalRef.instance;
    modalInstance.title = config.title;
    modalInstance.content = config.content;
    modalInstance.size = config.size || 'medium';
    modalInstance.showCloseButton = config.showCloseButton !== false;
    modalInstance.closeOnBackdropClick = config.closeOnBackdropClick !== false;
    modalInstance.closeOnEscape = config.closeOnEscape !== false;
    modalInstance.buttons = config.buttons;
    modalInstance.customClass = config.customClass;
    modalInstance.contentClass = config.contentClass;
    modalInstance.ariaLabel = config.ariaLabel;
    modalInstance.ariaDescribedBy = config.ariaDescribedBy;

    // Subscribe to close event
    modalInstance.closed.subscribe(() => {
      this.close(modalRef);
    });

    // Attach to the application
    this.appRef.attachView(modalRef.hostView);

    // Append to body
    const domElem = (modalRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    // Open the modal
    modalInstance.open();

    // Store reference
    this.modalRefs.push(modalRef);

    return modalRef;
  }

  /**
   * Closes a specific modal
   * @param modalRef Reference to the modal to close
   */
  close(modalRef: ComponentRef<Modal>): void {
    const index = this.modalRefs.indexOf(modalRef);
    if (index > -1) {
      this.modalRefs.splice(index, 1);
    }

    // Detach from application
    this.appRef.detachView(modalRef.hostView);

    // Destroy the component
    modalRef.destroy();
  }

  /**
   * Closes all open modals
   */
  closeAll(): void {
    this.modalRefs.forEach((modalRef) => {
      modalRef.instance.close();
    });
    this.modalRefs = [];
  }

  /**
   * Gets the number of currently open modals
   */
  get openModalCount(): number {
    return this.modalRefs.length;
  }
}

