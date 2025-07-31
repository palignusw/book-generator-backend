import { Controller, Get, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { QueryBooksDto } from './dto/query-books.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getBooks(@Query() query: QueryBooksDto) {
    return this.booksService.getBooks({
      seed: query.seed,
      page: parseInt(query.page, 10),
      region: query.region,
      likes: parseFloat(query.likes),
      reviews: parseFloat(query.reviews),
    });
  }
}
