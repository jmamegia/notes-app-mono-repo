import axios from "axios";

const baseUrl = "/api/login";

const login = (userName, password) => {
  const req = axios.post(baseUrl, {
    userName,
    password,
  });
  return req.then((res) => res.data);
};

export default { login };
