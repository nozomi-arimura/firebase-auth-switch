export class CustomError {
  static typeError(value: unknown) {
    let toStrValue: string | unknown;
    try {
      toStrValue = JSON.stringify(value);
    } catch {
      toStrValue = value;
    }
    console.warn(this.createMessage("typeError", toStrValue));
  }

  private static createMessage(type: "typeError", value: unknown) {
    return `firebase-auth-switcher Error 
type:${type} 
message:${value}`;
  }
}
