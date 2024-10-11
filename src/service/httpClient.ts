type HttpClientConfig = {
  rawRequest?: boolean;
};

class HttpClient {
  private readonly baseUrl: string = `${process.env.NEXT_PUBLIC_API_URL}`;

  async get<T>(
    url: string,
    config?: RequestInit,
    customConfig?: HttpClientConfig
  ): Promise<T> {
    if (customConfig?.rawRequest) {
      const res = (await fetch(`${url}`, {
        ...config,
        method: "GET",
      })) as T;

      return res as T;
    }

    const res = await fetch(`${this.baseUrl}${url}`, {
      ...config,
      method: "GET",
    });

    return res.json() as T;
  }

  async post<T>(url: string, body: unknown, config?: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${url}`, {
      ...config,
      method: "POST",
      body: JSON.stringify(body),
    });

    return res.json() as T;
  }

  async patch<T>(url: string, body: unknown, config?: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${url}`, {
      ...config,
      method: "PATCH",
      body: JSON.stringify(body),
    });

    return res.json() as T;
  }

  async delete<T>(url: string, config?: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${url}`, {
      ...config,
      method: "DELETE",
    });

    return res.json() as T;
  }
}

export default new HttpClient();
