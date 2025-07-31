import { Injectable } from '@nestjs/common';
import { generateBooks } from './utils/generate-books';

@Injectable()
export class BooksService {
  getBooks(params: {
    seed: string;
    page: number;
    region: string;
    likes: number;
    reviews: number;
  }) {
    return generateBooks({
      seed: params.seed,
      page: params.page,
      locale: params.region,
      avgLikes: params.likes,
      avgReviews: params.reviews,
    });
  }
}
