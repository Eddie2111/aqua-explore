import { EMethodTypes } from './auth.types';
import type { TRequestConfig, TSignInProps } from './auth.types';

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

  async signIn({ email }: TSignInProps) {
    return this.request('/email/login', EMethodTypes.POST, { email });
  }

  async signUp({ email }: TSignInProps) {
    return this.request('/email/signup', EMethodTypes.POST, {
      email,
    });
  }

  async signOut() {
    throw new Error('Method not implemented.');
  }
}

const userApiModule = new userModule('http://localhost:5000/api/v1');

export default userApiModule;
