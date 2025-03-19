export const fetchWithErrorHandling = async (url, options = {}) => {
  const response = await fetch(`http://localhost:8001/${url}`, options);

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(`${errorBody.message || "Error desconocido"}`);
  }

  return response.json();
};

export const convertJsonToFormData = (jsonObject) => {
  const formData = new FormData();

  Object.keys(jsonObject).forEach((key) => {
    formData.append(key, jsonObject[key]);
  });

  return formData;
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
    const options = {
      method: "POST",
    };

    if (data instanceof FormData) {
      options.body = data;
    } else {
      options.headers = {
        "Content-Type": "application/json",
      };
      options.body = JSON.stringify(data);
    }

    const response = fetchWithErrorHandling(`${this.baseRoute}`, options);
    return response;
  }

  async patch(id, data) {
    const options = {
      method: "PATCH",
    };

    if (data instanceof FormData) {
      options.body = data;
    } else {
      options.headers = {
        "Content-Type": "application/json",
      };
      options.body = JSON.stringify(data);
    }

    const response = fetchWithErrorHandling(`${this.baseRoute}/${id}`, options);
    return response;
  }

  async delete(id) {
    const response = fetchWithErrorHandling(`${this.baseRoute}/${id}`, {
      method: "DELETE",
    });
    return response;
  }
}
