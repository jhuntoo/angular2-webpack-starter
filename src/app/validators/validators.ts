export class Validators {
  static required(c: Control): StringMap<string, boolean> {
    return isBlank(c.value) || c.value == "" ? {"required": true} : null;
}
