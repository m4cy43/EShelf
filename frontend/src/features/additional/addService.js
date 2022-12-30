import axios from "axios";

const authorURL = "/api/author/";
const genreURL = "/api/genre/";
const sectionURL = "/api/section/";

const getAllAuthors = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(authorURL + "");
  return res.data;
};

const getAllGenres = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(genreURL + "");
  return res.data;
};

const getAllSections = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(sectionURL + "");
  return res.data;
};

const bookService = {
  getAllAuthors,
  getAllGenres,
  getAllSections,
};

export default bookService;
