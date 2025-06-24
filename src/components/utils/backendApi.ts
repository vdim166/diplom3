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

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

class BackendApi {
  // private defaultUrl: string = "http://localhost:8000/api";
  // private defaultUrl: string = "/api";
  private defaultUrl: string = `${BACKEND_URL}`;

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

  async deleteTask(id: string) {
    const response = await fetch(`${this.defaultUrl}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  }

  async getWorkers() {
    const response = await fetch(`${this.defaultUrl}/workers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  }

  async getManagers() {
    const response = await fetch(`${this.defaultUrl}/managers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  }

  async givePermission(username: string) {
    const response = await fetch(`${this.defaultUrl}/user/update/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        is_manager: true,
      }),
    });

    return response;
  }

  async deleteUser(username: string) {
    const response = await fetch(`${this.defaultUrl}/user/delete/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
      }),
    });

    return response;
  }

  async removePermission(username: string) {
    const response = await fetch(`${this.defaultUrl}/user/update/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        is_manager: false,
      }),
    });

    return response;
  }

  async changeExpTime(id: string, storage_id: string, expiration_date: string) {
    const response = await fetch(
      `${this.defaultUrl}/items/${storage_id}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expiration_date,
        }),
      }
    );

    return response;
  }
}

export const backendApi = new BackendApi();
