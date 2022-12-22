import axios from "axios";

const URL = "/api/book/";

const getAllBooks = async () => {
  const res = await axios.get(URL + "");
  return res.data;
};

const simpleFind = async (query) => {
  if (query === "") query = "_";
  const res = await axios.get(URL + `find?title=${query}`);
  return res.data;
};

const advancedFind = async (query) => {
  for (let el in query) {
    if (query[el] === "") query[el] = "_";
  }
  const res = await axios.get(
    URL +
      `afind?title=${query.title}&author=${query.author}&year=${query.year}&genre=${query.genre}&section=${query.section}`
  );
  return res.data;
};

const oneBook = async (query) => {
  const res = await axios.get(URL + `one/${query}`);
  return res.data;
};

const getAuthorBooks = async (query) => {
  const res = await axios.get(URL + `authorall/${query}`);
  return res.data;
};

const bookService = {
  getAllBooks,
  simpleFind,
  advancedFind,
  oneBook,
  getAuthorBooks
};

export default bookService;
