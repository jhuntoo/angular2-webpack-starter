import {Injectable} from 'angular2/core';
import {Title} from 'angular2/platform/browser';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';

@Injectable()
export class SeoService {

  private titleService: Title;
  private headElement: HTMLElement;
  private metaDescription: HTMLElement;
  private robots: HTMLElement;

  constructor(titleService: Title) {
    this.titleService = titleService;
    this.headElement = DOM.query('head');
    this.metaDescription = this.getOrCreateMetaElement('description');
    this.robots = this.getOrCreateMetaElement('robots');
  }

  public getTitle(): string {
    return this.titleService.getTitle();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  public getMetaDescription(): string {
    return this.metaDescription.getAttribute('content');
  }

  public setMetaDescription(description: string) {
    this.metaDescription.setAttribute('content', description);
  }

  public getMetaRotbos(): string {
    return this.robots.getAttribute('content');
  }

  public setMetaRotbos(robots: string) {
    this.robots.setAttribute('content', robots);
  }

  private getOrCreateMetaElement(name: string): HTMLElement {
    let el: HTMLElement;
    el = DOM.query('meta[name=' + name + ']');
    if (el === null) {
      el = DOM.createElement('meta');
      el.setAttribute('name', name);
      this.headElement.appendChild(el);
    }
    return el;
  }
}

@Injectable()
export class MockSeoService {

  public title: string;
  private headElement: HTMLElement;
  private metaDescription: HTMLElement;
  private robots: HTMLElement;

  constructor() {
  }

  public getTitle(): string {
    return this.title;
  }

  public setTitle(newTitle: string) {
    this.title = newTitle;
  }

  public getMetaDescription(): string {
    return this.metaDescription.getAttribute('content');
  }

  public setMetaDescription(description: string) {
    this.metaDescription.setAttribute('content', description);
  }

  public getMetaRotbos(): string {
    return this.robots.getAttribute('content');
  }

  public setMetaRotbos(robots: string) {
    this.robots.setAttribute('content', robots);
  }

  private getOrCreateMetaElement(name: string): HTMLElement {
    let el: HTMLElement;
    el = DOM.query('meta[name=' + name + ']');
    if (el === null) {
      el = DOM.createElement('meta');
      el.setAttribute('name', name);
      this.headElement.appendChild(el);
    }
    return el;
  }
}
