export class RegisterResponse {
  constructor(public success: boolean,
              public alreadyExists: boolean,
              public error?: string) {
  }

  static success() : RegisterResponse {
    return new RegisterResponse(true, false, null);
  }

  static alreadyExists() : RegisterResponse {
    return new RegisterResponse(false, true, null);
  }

  static error(msg : string = null) : RegisterResponse {
    return new RegisterResponse(false, false, msg);
  }


}
