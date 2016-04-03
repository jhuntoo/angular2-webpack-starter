import {Component,  Input, Output, EventEmitter} from 'angular2/core';

/**
 * Shows a bootstrap modal dialog.
 * Set the body of the dialog by adding content to the modal tag: <modal>content here</modal>.
 */
@Component({
  selector: 'modal',
  template: require('./modal.html')
})
export class Modal {
  /* tslint:disable */
  @Input('title') title: string;
  @Input('show-cancel') showCancel: boolean = false;
  @Input('cancel-label') cancelLabel: string = 'Cancel';
  @Input('positive-label') positiveLabel: string = 'OK';

  /**
   * Fires an event when the modal is closed. The argument indicated how it was closed.
   * @type {EventEmitter<ModalResult>}
   */
  @Output('closed') closeEmitter: EventEmitter<ModalResult> = new EventEmitter<ModalResult>();
  /* tslint:enable */


  showModal: boolean = false;

  constructor() {
    console.log('showModal = ' + this.showModal);
  }

  /**
   * Shows the modal. There is no method for hiding. This is done using actions of the modal itself.
   */
  show() {
    this.showModal = true;
  }

  positiveAction() {
    this.showModal = false;
    this.closeEmitter.next({
      action: ModalAction.POSITIVE
    });
    return false;
  }

  cancelAction() {
    console.log('sending close event');
    this.showModal = false;
    this.closeEmitter.next({
      action: ModalAction.CANCEL
    });
    return false;
  }
}

/**
 * The possible reasons a modal has been closed.
 */
export enum ModalAction { POSITIVE, CANCEL }
/**
 * Models the result of closing a modal dialog.
 */
export interface ModalResult {
  action: ModalAction;
}
