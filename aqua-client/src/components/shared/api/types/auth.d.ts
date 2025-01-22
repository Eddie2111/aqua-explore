enum EMethodTypes {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
type TRequestConfig = {
  method: EMethodTypes;
  headers: Record<string, string>;
  body?: string;
};
type TSignInProps = {
  email: string;
  password: string;
};
type TSignUpProps = {
  email: string;
  password: string;
  fullName: string;
};
type TResetPassword = {
  token: string;
  newPassword: string;
};

export {
  EMethodTypes,
  TRequestConfig,
  TSignInProps,
  TSignUpProps,
  TResetPassword,
};
