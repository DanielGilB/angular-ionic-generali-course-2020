import { BookLanguage } from './book-language.enum';

export interface Book {
  id: number;
  title: string;
  language: BookLanguage;
  edition?: string;
  publisher: string;
}
