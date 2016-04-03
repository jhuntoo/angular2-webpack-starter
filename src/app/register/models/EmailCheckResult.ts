export class EmailCheckResult {
  constructor(public available:boolean,
              public error:boolean,
              public connectedProfiles : string[]) {
    if (!connectedProfiles) {
      this.connectedProfiles = [];
    }
  }

  static error():EmailCheckResult {
    return new EmailCheckResult(false, true, []);
  }

  static taken():EmailCheckResult {
    return new EmailCheckResult(false, false, []);
  }

  static available(connectedProfiles):EmailCheckResult {
    return new EmailCheckResult(true, false, connectedProfiles);
  }

}
