export class RegisterResponse {
  constructor(public success: boolean,
              public alreadyExists: boolean,
              public error?: string,
              public jwt?: string) {
  }

  static success(jwt: string) : RegisterResponse {
    return new RegisterResponse(true, false, null, jwt);
  }

  static alreadyExists() : RegisterResponse {
    return new RegisterResponse(false, true, null, null);
  }

  static error(msg : string = null) : RegisterResponse {
    return new RegisterResponse(false, false, msg, null);
  }


}
