import { EMethodTypes, TRequestConfig } from '../../core/EMethod.types';
import { TExpedition } from './events.types';

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
    return data;
  }

  async create(data: TExpedition) {
    return this.request('/expedition', EMethodTypes.POST, data);
  }
  async read(): Promise<TExpedition[] | null> {
    return this.request('/expedition', EMethodTypes.GET);
  }
  async readOne(data: string): Promise<TExpedition | null> {
    return this.request(`/expedition/${data}`, EMethodTypes.GET);
  }
  async update(data: Partial<TExpedition>) {
    return this.request(`/expedition/${data._id}`, EMethodTypes.PUT, data);
  }
  async delete(data: string) {
    return this.request(`/expedition/${data}`, EMethodTypes.DELETE);
  }
  async search(params: string) {
    return this.request(`/expedition/search/${params}`, EMethodTypes.GET);
  }
  async booking(expeditionId: string, participantId: string) {
    return this.request('/expedition/addParticipant', EMethodTypes.POST, {
      expeditionId,
      participantId,
    });
  }
}

const expeditionApiModule = new userModule('http://localhost:5000/api/v1');

export default expeditionApiModule;
