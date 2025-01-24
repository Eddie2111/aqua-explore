export enum EMethodTypes {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
export type TRequestConfig = {
  method: EMethodTypes;
  headers: Record<string, string>;
  body?: string;
};
export type TSignInProps = {
  email: string;
};
export type TSignUpProps = {
  email: string;
  fullName: string;
};
export type TLoginResponse = {
  access_token: string;
};
