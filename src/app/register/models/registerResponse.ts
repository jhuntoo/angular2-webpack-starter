export class RegisterResponse {
  static success(confirmEmail: boolean, jwt: string) : RegisterResponse {
    return new RegisterResponse(true, false, confirmEmail, null, jwt);
  }

  static alreadyExists() : RegisterResponse {
    return new RegisterResponse(false, true, false, null, null);
  }

  static error(msg : string = null) : RegisterResponse {
    return new RegisterResponse(false, false, false, msg, null);
  }
  constructor(public success: boolean,
              public alreadyExists: boolean,
              public confirmEmail: boolean,
              public error?: string,
              public jwt?: string) {
  }
}
