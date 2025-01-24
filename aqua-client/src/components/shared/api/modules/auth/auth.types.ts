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
  password: string;
};
export type TSignUpProps = {
  email: string;
  password: string;
  fullName: string;
};
