export const fetchApi = (url) => {
  return fetch(url, {
    mode: "no-cors",
  })
    .then((resp) => resp.json())
    .then((data) => {
      return data;
    });
};
