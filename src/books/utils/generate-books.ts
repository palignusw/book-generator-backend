import { faker } from '@faker-js/faker';
import * as seedrandom from 'seedrandom';

const wordLists: Record<string, string[]> = {
  en: [
    'future',
    'education',
    'technology',
    'society',
    'market',
    'strategy',
    'development',
    'research',
    'innovation',
    'analysis',
  ],
  ru: [
    'будущее',
    'образование',
    'инновации',
    'рынок',
    'стратегия',
    'исследование',
    'управление',
    'влияние',
    'технологии',
    'развитие',
  ],
  de: [
    'Zukunft',
    'Bildung',
    'Technologie',
    'Gesellschaft',
    'Markt',
    'Strategie',
    'Entwicklung',
    'Forschung',
    'Innovation',
    'Analyse',
  ],
  fr: [
    'avenir',
    'éducation',
    'technologie',
    'société',
    'marché',
    'stratégie',
    'développement',
    'recherche',
    'innovation',
    'analyse',
  ],
  es: [
    'futuro',
    'educación',
    'tecnología',
    'sociedad',
    'mercado',
    'estrategia',
    'desarrollo',
    'investigación',
    'innovación',
    'análisis',
  ],
  it: [
    'futuro',
    'educazione',
    'tecnologia',
    'società',
    'mercato',
    'strategia',
    'sviluppo',
    'ricerca',
    'innovazione',
    'analisi',
  ],
};

type TitleTemplate = (...args: string[]) => string;

const titleTemplates: Record<string, TitleTemplate[]> = {
  en: [
    (w1, w2) => `The ${w1} of ${w2}`,
    (w1, w2) => `${w1} and ${w2}`,
    (w1, w2, w3) => `${w1}, ${w2}, and ${w3}`,
  ],
  ru: [
    (w1, w2) => `${w1} и ${w2}`,
    (w1, w2) => `${w1} в условиях ${w2}`,
    (w1, w2, w3) => `${w1}, ${w2} и ${w3}`,
    (w1) => `Проблемы ${w1}`,
  ],
  de: [
    (w1, w2) => `${w1} und ${w2}`,
    (w1) => `Die Zukunft der ${w1}`,
    (w1, w2, w3) => `${w1}, ${w2} und ${w3}`,
  ],
  fr: [
    (w1, w2) => `${w1} et ${w2}`,
    (w1, w2) => `${w1} dans le contexte de ${w2}`,
    (w1) => `L'avenir de ${w1}`,
  ],
  es: [
    (w1, w2) => `${w1} y ${w2}`,
    (w1, w2) => `El futuro de ${w1} en ${w2}`,
    (w1, w2, w3) => `${w1}, ${w2} y ${w3}`,
  ],
  it: [
    (w1, w2) => `${w1} e ${w2}`,
    (w1) => `Il futuro della ${w1}`,
    (w1, w2, w3) => `${w1}, ${w2} e ${w3}`,
  ],
};

function generateAllPossibleTitles(locale: string): string[] {
  const code = locale.toLowerCase().slice(0, 2);
  const words = wordLists[code] || wordLists['en'];
  const templates = titleTemplates[code] || titleTemplates['en'];

  const titles = new Set<string>();

  for (const template of templates) {
    for (let i = 0; i < words.length; i++) {
      for (let j = 0; j < words.length; j++) {
        for (let k = 0; k < words.length; k++) {
          try {
            const title = template(words[i], words[j], words[k]);
            titles.add(title);
          } catch {}
        }
      }
    }
  }

  return faker.helpers.shuffle([...titles]);
}

export function generateBooks(params: {
  seed: string;
  page: number;
  locale: string;
  avgLikes: number;
  avgReviews: number;
}) {
  const { seed, page, locale, avgLikes, avgReviews } = params;

  try {
    faker.setLocale(locale.toLowerCase());
  } catch {
    faker.setLocale('en');
  }

  const combinedSeed = `${seed}_${page}`;
  const numericSeed = Math.floor(seedrandom(combinedSeed)() * 1_000_000_000);
  faker.seed(numericSeed);

  const allTitles = generateAllPossibleTitles(locale);
  const books = [];

  for (let i = 0; i < 10; i++) {
    const title = allTitles[i] || `Untitled ${i + 1}`;
    books.push({
      index: (page - 1) * 10 + i + 1,
      isbn: faker.datatype
        .number({ min: 1000000000000, max: 9999999999999 })
        .toString(),
      title,
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
