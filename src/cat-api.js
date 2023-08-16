import axios from "axios";

const API_KEY = "live_1hQkRGJ5q34ObXpHBjZpRn1no3hrViSV57nnOqHg4uDkfVmlGH7GpFJ5sI3fntLJ";
axios.defaults.headers.common["x-api-key"] = API_KEY;

const BREEDS_URL = "https://api.thecatapi.com/v1/breeds";
const SEARCH_URL = "https://api.thecatapi.com/v1/images/search";

export function fetchBreeds() {
  return axios.get(BREEDS_URL).then(resp => {
    return resp.data;
  });
}
export function fetchCatByBreed(breedId) {
  const params = new URLSearchParams({
    breed_ids: breedId,
  });

  return axios.get(`${SEARCH_URL}?${params}`).then(resp => {
    if (!resp.data.length) {
      throw new Error(resp.statusText);
    }
    return resp.data;
  });
}
