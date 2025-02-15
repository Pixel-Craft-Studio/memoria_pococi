export const fetchWithErrorHandling = async (url, options = {}) => {
  const response = await fetch(`http://localhost:8001/${url}`, options);

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(`${errorBody.message || "Error desconocido"}`);
  }

  return response.json();
};

export class BaseApiService {
  constructor(baseRoute) {
    this.baseRoute = baseRoute;
  }

  async getAll() {
    const response = fetchWithErrorHandling(`${this.baseRoute}`);
    return response;
  }

  async getById(id) {
    const response = fetchWithErrorHandling(`${this.baseRoute}/${id}`);
    return response;
  }

  async post(data) {
    const response = fetchWithErrorHandling(`${this.baseRoute}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response;
  }

  async patch(id, data) {
    const response = fetchWithErrorHandling(`${this.baseRoute}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response;
  }

  async delete(id) {
    const response = fetchWithErrorHandling(`${this.baseRoute}/${id}`, {
      method: 'DELETE',
    });
    return response;
  }
}
