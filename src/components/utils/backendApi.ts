import { fetchProductDataApi } from "./fetchProductDataApi";

export type ResponseTask = {
  assigned_to: string;
  created_at: string;
  description: string;
  id: string;
  status: string;
  title: string;
};

export type FetchedStorageItem = {
  category: string;
  count: number;
  id: string;
  name: string;
  storage_id: string;
  expiration_date: string;
};

class BackendApi {
  private defaultUrl: string = "http://localhost:8000/api";
  // private defaultUrl: string = "/api";

  async checkToken(token: string) {
    const response = await fetch(`${this.defaultUrl}/validate-token`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return response;
  }

  async register(username: string, password: string) {
    const response = await fetch(`${this.defaultUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    return response;
  }

  async getToken(username: string, password: string) {
    const response = await fetch(`${this.defaultUrl}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    return response;
  }

  async getAllTasks() {
    const response = await fetch(`${this.defaultUrl}/tasks`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: {
      todo: { [key: string]: ResponseTask[] };
      in_progress: { [key: string]: ResponseTask[] };
      done: { [key: string]: ResponseTask[] };
    } = await response.json();

    return data;
  }

  async createTask(data: {
    title: string;
    description: string;
    assigned_to: string;
    query?: string;
  }) {
    const response = await fetch(`${this.defaultUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  }

  async moveTask(id: string, newStatus: string) {
    const response = await fetch(`${this.defaultUrl}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    });

    return response;
  }

  async fetchStorage() {
    const response = await fetch(`${this.defaultUrl}/items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: FetchedStorageItem[] = await response.json();

    return data;
  }

  async forecast() {
    const result = [];

    const data = await fetchProductDataApi.fetch();

    for (let i = 0; i < data.length; ++i) {
      const requestData = data[i];

      const response = await fetch(`${this.defaultUrl}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const newData: { price: number } = await response.json();
      result.push(newData);
    }
    return { data, result };
  }

  async getAllUsers(token: string) {
    const response = await fetch(`${this.defaultUrl}/users`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data = await response.json();

    return data;
  }
}

export const backendApi = new BackendApi();
