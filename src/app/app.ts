/*
 * Angular 2 decorators and services
 */
import {Directive, Component, ElementRef, Renderer} from 'angular2/core';
import {RouteConfig, Router} from 'angular2/router';
import {Http, Headers} from 'angular2/http';
import {RegisterComponent} from './register/register.component'


/*
 * Angular Directives
 */
import {ROUTER_DIRECTIVES} from 'angular2/router';

/*
 * Directive
 * XLarge is a simple directive to show how one is made
 */
@Directive({
  selector: '[x-large]' // using [ ] means selecting attributes
})
export class XLarge {
  constructor(element: ElementRef, renderer: Renderer) {
    // simple DOM manipulation to set font size to x-large
    // `nativeElement` is the direct reference to the DOM element
    // element.nativeElement.style.fontSize = 'x-large';

    // for server/webworker support use the renderer
    renderer.setElementStyle(element, 'fontSize', 'x-large');
  }
}

/*
 * App Component
 * Top Level Component
 */
@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  selector: 'app', // <app></app>
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ ROUTER_DIRECTIVES, XLarge ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [`
    .title {
      font-family: Arial, Helvetica, sans-serif;
    }
    main {
      padding: 1em;
    }
  `],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `
  <header>
    <h1 class="title">Hello {{ title }}</h1>
  </header>

  <main>
   <div class="container">
      <h1 class="display-4">{{ title }}</h1>
      <p class="lead">Light-weight and easy to use seed project for Angular 2 apps.</p>
      <img src="./images/super-fat-heroes.png" width="300px">
      <hr>
      <div class="btn-group">
        <a class="btn btn-primary-outline" [routerLink]="['Register']">Register</a>
      </div>
      <hr>
      <router-outlet></router-outlet>
    </div>

    <pre>this.title = {{ title | json }}</pre>

  </main>

  <footer x-large>
    Homely
  </footer>
  `
})
@RouteConfig([
  { path: '/register', name: 'Register', component: RegisterComponent, useAsDefault: true }
])
export class App {
  // These are member type
  title: string;

  // TypeScript public modifiers
  constructor(public http: Http) {
    this.title = 'Angular 2';
  }

  // ngOnInit() {
  //
  // }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 * or via chat on Gitter at https://gitter.im/AngularClass/angular2-webpack-starter
 */
