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
