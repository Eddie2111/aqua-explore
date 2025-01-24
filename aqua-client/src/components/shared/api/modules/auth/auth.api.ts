import { EMethodTypes } from './auth.types';
import type { TRequestConfig, TSignInProps, TSignUpProps } from './auth.types';

class userModule {
  private readonly baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async request(
    endpoint: string,
    method: EMethodTypes,
    body?: object | undefined | null,
    headers = {},
  ) {
    const config: TRequestConfig = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };
    if (body) config.body = JSON.stringify(body);

    const response = await fetch(`${this.baseURL}${endpoint}`, config);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'An error occurred');
    }
    const data = await response.json();
    console.log(data);
    return data;
  }

  async getMe(token: string) {
    return this.request('/user/me', EMethodTypes.GET, null, {
      Authorization: `Bearer ${token}`,
    });
  }

  async signIn({ email, password }: TSignInProps) {
    return this.request('/user/login', EMethodTypes.POST, { email, password });
  }

  async signUp({ email, password, fullName }: TSignUpProps) {
    return this.request('/user/signup', EMethodTypes.POST, {
      email,
      password,
      fullName,
    });
  }

  async signOut() {
    throw new Error('Method not implemented.');
  }
}

const userApiModule = new userModule('http://localhost:5000/api/v1');

export default userApiModule;
