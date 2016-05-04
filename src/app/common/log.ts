import {Injectable} from '@angular/core';
export var Level = {
  debug: 1,
  info: 2,
  warning: 3,
  error: 4,
  mute:5
};

@Injectable()
export class LoggingService {
  public level: number = Level.debug;
  getLogger(name: string) : Logger {
    return new Logger(name, this.level);
  }
}




export class Logger {

  constructor(public name: string, public level: number) {

  }

  debug(...args) {
    if( this.level > Level.debug ) {
      return;
    }

    var t = ['%s | %cDebug: ', this.name, 'color:green'];
    t.push(...args);
    console.log.apply(console, t);
  }

  info(...args) {
    if( this.level > Level.info ) {
      return;
    }

    var t = ['%s | %cInfo: ', this.name, 'color:blue'];
    t.push(...args);
    console.log.apply(console, t);
  }

  warning(...args) {
    if( this.level > Level.warning ) {
      return;
    }

    var t = ['%s | %cWarning: ', this.name, 'color:orange'];
    t.push(...args);
    console.log.apply(console, t);
    // Publish an event
  }

  error(...args) {
    if( this.level > Level.error ) {
      return;
    }

    var t = ['%s | %cError: ', this.name, 'color:red'];
    t.push(...args);
    console.log.apply(console, t);
  }


}
