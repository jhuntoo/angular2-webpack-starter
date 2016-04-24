import {Component, Input, ViewChild, ChangeDetectionStrategy, OnInit} from 'angular2/core';
import {LoggingService, Logger} from '../../app/common/log';
import {EventCategoryRegistrationType} from './models/EventCategoryRegistrationType';
import {RegistrationTypeItem} from './registration-type-item';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {Modal, ModalResult, ModalAction} from '../../app/common/modal/modal';
import {AgeRestriction} from './models/AgeRestriction';

@Component({
  selector: 'registration-type-list',  // <home></home>
  directives: [RegistrationTypeItem, Modal,  ACCORDION_DIRECTIVES],
  template: require('./registration-type-list.html'),
  styles: [require('./registration-type-list.less').toString()],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RegistrationTypeList implements OnInit {


  log:Logger;
  @Input() registrationTypes: EventCategoryRegistrationType[];
  @ViewChild('modal') modal: Modal;
  @ViewChild('currentItem') currentItem: RegistrationTypeItem;

  constructor(logginService: LoggingService) {
    this.log = logginService.getLogger('RegistrationTypeList');



  }

  ngOnInit() {
    //let newRegistrationType = new EventCategoryRegistrationType();
    //newRegistrationType.cost = 123;
    //newRegistrationType.capacity = 100;
    //newRegistrationType.currencyCode = 'GBP';
    //newRegistrationType.type = "GROUP";
    //newRegistrationType.registrationClosureDate = new Date(2020, 11, 11);
    //newRegistrationType.description = 'Some description...'
    //let ar = new AgeRestriction();
    //ar.min = 8;
    //ar.min = 18;
    //newRegistrationType.ageRestriction = ar;
    //this.registrationTypes.push(newRegistrationType);
  }

  addType() {
    let newRegistrationType = new EventCategoryRegistrationType();
    if (this.registrationTypes.length > 0) {
      let lastRegistrationType = this.registrationTypes[this.registrationTypes.length - 1];
      //newRegistrationType.sportId = lastRegistrationType.sportId;
      newRegistrationType.registrationClosureDate = lastRegistrationType.registrationClosureDate;
    }
    //this.currentItem.setPristine();
    this.currentItem.updateModel(newRegistrationType);
    //this.currentItem.clear();
    //this.currentItem.model = newRegistrationType;
    this.modal.positiveLabel = 'Create';
    this.modal.title = 'New Registration Type';
    this.modal.show();

    this.log.debug(`categories: ${JSON.stringify(this.registrationTypes)}`);
  }

  onRegistrationTypeClosed(modalResult : ModalResult, registrationType: EventCategoryRegistrationType) {
    this.log.debug(`onCreateNewRegistrationTypeClosed: modalResult = ${JSON.stringify(modalResult)}, registrationType = ${JSON.stringify(registrationType)}`);

    if (modalResult.action === ModalAction.POSITIVE) {
      var index : number = this.registrationTypes.indexOf(registrationType);
      if (index > -1) {
        this.registrationTypes[index] = registrationType;
      } else {
        this.registrationTypes.push(registrationType);
      }
    }

  }

  removeRegistrationType(registrationType : EventCategoryRegistrationType) {
    var index : number = this.registrationTypes.indexOf(registrationType);
    if (index > -1) {
      this.registrationTypes.splice(index, 1);
    }
  }
  editRegistrationType(registrationType : EventCategoryRegistrationType) {
    this.log.debug(`editRegistrationType: ${JSON.stringify(registrationType)}`);
    this.currentItem.updateModel(registrationType);
    this.modal.positiveLabel = 'Ok';
    this.modal.title = 'Edit Registration Type';
    this.modal.show();
  }

}
