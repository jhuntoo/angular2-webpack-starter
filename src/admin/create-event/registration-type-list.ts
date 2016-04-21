import {Component, Input, ViewChild} from 'angular2/core';
import {LoggingService, Logger} from '../../app/common/log';
import {EventCategoryRegistrationType} from './models/EventCategoryRegistrationType';
import {RegistrationTypeItem} from './registration-type-item';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {Modal, ModalResult, ModalAction} from '../../app/common/modal/modal';

@Component({
  selector: 'registration-type-list',  // <home></home>
  directives: [RegistrationTypeItem, Modal,  ACCORDION_DIRECTIVES],
  template: require('./registration-type-list.html'),
  styles: [require('./registration-type-list.less').toString()]
})
export class RegistrationTypeList {

  log:Logger;
  @Input() registrationTypes: EventCategoryRegistrationType[];
  @ViewChild('modal') modal: Modal;
  @ViewChild('newItem') newItem: RegistrationTypeItem;
  constructor(logginService: LoggingService) {
    this.log = logginService.getLogger('RegistrationTypeList');
  }

  addType() {
    let newRegistrationType = new EventCategoryRegistrationType();
    if (this.registrationTypes.length > 0) {
      let lastRegistrationType = this.registrationTypes[this.registrationTypes.length - 1];
      //newRegistrationType.sportId = lastRegistrationType.sportId;
      newRegistrationType.registrationClosureDate = lastRegistrationType.registrationClosureDate;
    }

    this.newItem.model = newRegistrationType;
    this.modal.show();

    this.log.debug(`categories: ${JSON.stringify(this.registrationTypes)}`);
  }

  onCreateNewRegistrationTypeClosed(modalResult : ModalResult, newRegistrationType: EventCategoryRegistrationType) {
    this.log.debug(`onCreateNewRegistrationTypeClosed: modalResult = ${JSON.stringify(modalResult)}, registrationType = ${JSON.stringify(newRegistrationType)}`);

    if (modalResult.action === ModalAction.POSITIVE) {
      this.registrationTypes.push(newRegistrationType);
    }

  }

  removeRegistrationType(registrationType : EventCategoryRegistrationType) {
    var index : number = this.registrationTypes.indexOf(registrationType);
    if (index > -1) {
      this.registrationTypes.splice(index, 1);
    }
  }

}
