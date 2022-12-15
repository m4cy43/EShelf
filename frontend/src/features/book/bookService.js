import axios from "axios";

const URL = "/api/book/";

const getAllBooks = async () => {
  const res = await axios.get(URL + "");
  return res.data;
};

const simpleFind = async (query) => {
  const res = await axios.get(URL + `/find?title=${query}`);
  return res.data;
};

const bookService = {
  getAllBooks,
  simpleFind
};

export default bookService;
