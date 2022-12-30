import axios from "axios";

const URL = "/api/user/";

const getUnVerified = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(URL + "verify", config);
  return res.data;
};

const getNotAdmin = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(URL + "adm", config);
  return res.data;
};

const verifyUser = async (query, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.put(URL + `verify/${query}`, {}, config);
  return res.data;
};

const setAdmin = async (query, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.put(URL + `adm/${query}`, {}, config);
  return res.data;
};

const userService = {
  getUnVerified,
  verifyUser,
  setAdmin,
  getNotAdmin,
};

export default userService;
