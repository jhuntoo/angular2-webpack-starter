import {Directive, Component, Input} from '@angular/core';
import {Router} from '@angular/router-deprecated';
/*
 * Directive
 * XLarge is a simple directive to show how one is made
 */
@Component({
  selector: 'sub-item',
  template: require('./sub-item.html')
})
export class SubItem {
  public isCollapsed:boolean = false;
  @Input() title: string;
  @Input() navigateTo: string;
  constructor(private _router: Router) {
  }

  navigate() {
      this._router.navigate([this.navigateTo]);
  }
}
