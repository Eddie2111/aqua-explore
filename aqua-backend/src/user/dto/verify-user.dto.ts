export enum ERequestType {
  SIGNUP = 'signup',
  LOGIN = 'login',
}
export class VerifyUserDto {
  token: string;
  requestType: ERequestType;
}
