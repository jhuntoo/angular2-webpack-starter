export class EmailCheckResult {

  static error():EmailCheckResult {
    return new EmailCheckResult(false, true, []);
  }

  static taken():EmailCheckResult {
    return new EmailCheckResult(false, false, []);
  }

  static available(connectedProfiles : string[] = []):EmailCheckResult {
    return new EmailCheckResult(true, false, connectedProfiles);
  }
  constructor(public available:boolean,
              public error:boolean,
              public connectedProfiles) {
    if (!connectedProfiles) {
      this.connectedProfiles = [];
    }
  }
}
