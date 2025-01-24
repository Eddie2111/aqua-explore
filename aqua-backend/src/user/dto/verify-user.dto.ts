export enum ERequestType {
  SIGNUP = 'signup',
  SIGNIN = 'signin',
}
export class VerifyUserDto {
  token: string;
  requestType: ERequestType;
}
