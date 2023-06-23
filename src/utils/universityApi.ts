import axios from "axios";

const BASE_URL:string = "http://universities.hipolabs.com/search?";

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}${url}`);

  return data;
};
