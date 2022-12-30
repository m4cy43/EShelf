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

const getAllBookings = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(URL + "book", config);
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

const bookTheBook = async (query, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post(URL + `book/${query}`, {}, config);
  return res.data;
};

const unbookTheBook = async (query, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete(URL + `delbook/${query}`, config);
  return res.data;
};

const getBoth = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(URL + `both`, config);
  return res.data;
};

const debtTheBook = async (query, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.put(
    URL + `?userq=${query.usr}&bookq=${query.bok}`,
    {},
    config
  );
  return res.data;
};

const deleteBookingAdm = async (query, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete(
    URL + `book?userq=${query.usr}&bookq=${query.bok}`,
    config
  );
  return res.data;
};

const deleteUserDebt = async (query, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete(
    URL + `?userq=${query.usr}&bookq=${query.bok}`,
    config
  );
  return res.data;
};

const debtService = {
  getAllDebts,
  oneBookDebt,
  bookTheBook,
  unbookTheBook,
  getBoth,
  getAllBookings,
  debtTheBook,
  deleteBookingAdm,
  deleteUserDebt
};

export default debtService;
