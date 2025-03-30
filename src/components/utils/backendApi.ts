class BackendApi {
  private defaultUrl: string = "http://localhost:8000";

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
}

export const backendApi = new BackendApi();
