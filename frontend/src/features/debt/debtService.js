import axios from "axios";

const URL = "/api/debt/";

const getAllDebts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(URL, config);
  return res.data;
};

const oneBookDebt = async (query, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(URL + `onebook/${query}`, config);
  return res.data;
};

const debtService = { getAllDebts, oneBookDebt };

export default debtService;
