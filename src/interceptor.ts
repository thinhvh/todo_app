import axios from "axios";

const baseUrl = "https://my-json-server.typicode.com/thinhvh/dbjson/";
const postUrl = "https://jsonplaceholder.typicode.com/";

axios.interceptors.request.use(
  (req) => {
    return {
      ...req,
      url: (req.method === "post" ? baseUrl : postUrl) + req.url,
    };
  },
  (err) => {
    return Promise.reject(err);
  }
);

// For POST requests
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    alert("Something went wrong" + JSON.stringify(err));
    return Promise.reject(err);
  }
);
