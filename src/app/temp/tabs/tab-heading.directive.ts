import {Directive, TemplateRef} from '@angular/core';
import {Tab} from './tab.directive';

@Directive({selector: '[tabHeading]'})
export class TabHeading {
  public templateRef:TemplateRef<any>;
  public constructor(templateRef:TemplateRef<any>, tab:Tab) {
    tab.headingRef = templateRef;
  }
}
