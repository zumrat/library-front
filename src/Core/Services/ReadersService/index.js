import { ReadersAPI } from "../../Api";

export const getReadersList = async () => {
  try {
    return await ReadersAPI.getReadersList();
  } catch (err) {
    console.log("Error getting readers list", err);
  }
};
