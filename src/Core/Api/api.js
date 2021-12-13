/* constants */
import { BASE_URL, REQUEST_TIMEOUT_DELAY } from "../../Shared/Constants";

const DEFAULT_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

function CustomException({ status, errorKey, errorText, statusText }) {
  this.status = status;
  this.errorKey = errorKey;
  this.errorText = errorText;
  this.statusText = statusText;
}

export const api = {
  post({ url, type, data, headers }) {
    return this.makeRequest(
      url,
      {
        method: "POST",
        headers: { ...DEFAULT_HEADERS, ...headers },
        body: JSON.stringify(data),
      },
      type
    )
      .then((result) => result)
      .catch((err) => {
        throw err;
      });
  },

  get({ url, type, params, headers }) {
    const urlWithParams = `${url}${this.paramsToQueryString(params)}`;

    return this.makeRequest(
      urlWithParams,
      {
        method: "GET",
        headers: { ...DEFAULT_HEADERS, ...headers },
      },
      type
    )
      .then((result) => result)
      .catch((err) => {
        throw err;
      });
  },

  put({ url, type, data, headers }) {
    return this.makeRequest(
      url,
      {
        method: "PUT",
        headers: { ...DEFAULT_HEADERS, ...headers },
        body: JSON.stringify(data),
      },
      type
    )
      .then((result) => result)
      .catch((err) => {
        throw err;
      });
  },

  delete({ url, type, params, headers }) {
    const urlWithParams = `${url}${this.paramsToQueryString(params)}`;

    return this.makeRequest(
      urlWithParams,
      {
        method: "DELETE",
        headers: { ...DEFAULT_HEADERS, ...headers },
      },
      type
    )
      .then((result) => result)
      .catch((err) => {
        throw err;
      });
  },

  async onResponse(response) {
    if (response.ok) {
      // 204 is 'No Content' status, so response.json() fails
      return response.status === 204 ? "Success" : await response.json();
    } else {
      const data = await response.json();

      const _error = {
        errorKey: "",
        errorText: "",
        message: "",
        name: "Fetch error",
        status: response.status,
        statusText: response.statusText,
      };

      throw new CustomException(_error);
    }
  },

  async _makeRequest(data) {
    // return Promise.race([
    //   fetch(data, {mode: 'no-cors'}),
    //   new Promise() <
    //     Error >
    //     ((_, reject) =>
    //       setTimeout(() => {
    //         reject(new Error("Timeout"));
    //       }, REQUEST_TIMEOUT_DELAY)),
    // ]);
    return fetch(data);
  },

  async makeRequest(uri, init) {
    let response;
    const request = new Request(`${BASE_URL}${uri}`, init);

    try {
      response = await this._makeRequest(request);

      return await this.onResponse(response);
    } catch (err) {
      const RETRY_ERRORS = ["Timeout", "Network request failed"];

      if (RETRY_ERRORS.includes(err.message)) {
        try {
          response = await this._makeRequest(request);

          return await this.onResponse(response);
        } catch (_err) {
          console.log(_err);
        }
      } else {
        throw err;
      }
    }
  },

  paramsToQueryString(params) {
    return params
      ? `?${Object.keys(params)
          .map((key) => {
            if (Array.isArray(params[key])) {
              return params[key]
                .map((value) => `${key}%5B%5D=${value}`)
                .join("&");
            }

            return `${key}${
              typeof params[key] === "object"
                ? `%5B${params[key]["param"]}%5D=${params[key]["value"]}`
                : `=${params[key]}`
            }`;
          })
          .join("&")}`
      : "";
  },
};
