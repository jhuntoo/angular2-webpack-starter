export class EmailCheckResult {
  constructor(public available:boolean,
              public error:boolean) {
  }

  static error():EmailCheckResult {
    return new EmailCheckResult(false, true)
  }

  static taken():EmailCheckResult {
    return new EmailCheckResult(false, false)
  }

  static available():EmailCheckResult {
    return new EmailCheckResult(true, false)
  }

}
