import { api } from "../api";

export const ReadersAPI = {
  async getReadersList() {
    return api.get({
      url: `/reader/list`,
    });
  },
};
