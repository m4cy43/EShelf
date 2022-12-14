import axios from "axios";

const URL = "/api/book/";

const getAllBooks = async () => {
  const res = await axios.get(URL + "");
  return res.data;
};

const bookService = {
  getAllBooks,
};

export default bookService;
