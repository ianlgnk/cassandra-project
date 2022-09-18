export class AppError {
  public readonly errorCode: number;
  public readonly errorMsg: String;

  constructor(errorCode: number, errorMsg: String) {
    this.errorCode = errorCode;
    this.errorMsg = errorMsg;
  }
}
