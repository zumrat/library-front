import { api } from "../api";

export const BooksAPI = {
  async getAllBooks() {
    return api.get({
      url: `/books`,
    });
  },

  async getPopularBooks() {
    return api.get({
      url: `/books/popular`,
    });
  },

  async getNewBooks() {
    return api.get({
      url: `/books/new`,
    });
  },

  async searchBooks(params) {
    return api.get({
      url: `/books/search`,
      params,
    });
  },
  async getBookById(id) {
    return api.get({
      url: `/books/${id}`,
    });
  },

  async borrowBook(data) {
    return api.post({
      url: `/checkout/borrow`,
      data,
    });
  },

  async getGenres() {
    return api.get({
      url: `/genres`,
    });
  },

  async addNewBook(data) {
    return api.post({
      url: `/books`,
      data,
    });
  },

  async deleteBook(id) {
    return api.delete({
      url: `/books/${id}`,
    });
  },

  async returnBook(data) {
    return api.post({
      url: `/checkout/return`,
      data,
    });
  },
};
