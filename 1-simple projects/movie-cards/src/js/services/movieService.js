import { movies } from './movies.js';

export default class MovieService {
  static getMovies() {
    return movies ? movies : [];
  }
}
