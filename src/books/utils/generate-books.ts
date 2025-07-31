import { faker } from '@faker-js/faker';
import * as seedrandom from 'seedrandom';

export function generateBooks(params: {
  seed: string;
  page: number;
  locale: string;
  avgLikes: number;
  avgReviews: number;
}) {
  const { seed, page, locale, avgLikes, avgReviews } = params;

  // Устанавливаем локаль (faker@7.6.0 поддерживает setLocale)
  try {
    faker.setLocale(locale);
  } catch {
    faker.setLocale('en'); // fallback
  }

  // Генерируем детерминированный seed
  const combinedSeed = `${seed}_${page}`;
  const numericSeed = Math.floor(seedrandom(combinedSeed)() * 1_000_000_000);
  faker.seed(numericSeed);

  const books = [];

  for (let i = 0; i < 10; i++) {
    books.push({
      index: (page - 1) * 10 + i + 1,
      isbn: faker.datatype
        .number({ min: 1000000000000, max: 9999999999999 })
        .toString(),
      title: faker.lorem.words(3),
      authors: [faker.name.fullName()],
      publisher: faker.company.name(),
      likes: fractional(avgLikes),
      reviews: fractional(avgReviews),
    });
  }

  return books;
}

function fractional(avg: number): number {
  const int = Math.floor(avg);
  const prob = avg - int;
  return Math.random() < prob ? int + 1 : int;
}
