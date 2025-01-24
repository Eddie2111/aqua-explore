import { EMethodTypes } from "../../core/EMethod.types";

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
export type TVerifyRequest = {
  token: string;
  requestType: string;
}