export class ConfirmEmailCodeResponse {
  constructor(public available:boolean,
              public error:boolean) {
  }

  static error():ConfirmEmailCodeResponse {
    return new ConfirmEmailCodeResponse(false, true);
  }


}
