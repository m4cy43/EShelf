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

const createAuthor = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post(authorURL + "", data, config);
  return res.data;
};

const createGenre = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post(genreURL + "", data, config);
  return res.data;
};

const createSection = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post(sectionURL + "", data, config);
  return res.data;
};

const deleteAuthor = async (query, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete(authorURL + `${query}`, config);
  return res.data;
};

const deleteGenre = async (query, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete(genreURL + `${query}`, config);
  return res.data;
};

const deleteSection = async (query, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete(sectionURL + `${query}`, config);
  return res.data;
};

const bookService = {
  getAllAuthors,
  getAllGenres,
  getAllSections,
  createAuthor,
  createGenre,
  createSection,
  deleteAuthor,
  deleteGenre,
  deleteSection,
};

export default bookService;
