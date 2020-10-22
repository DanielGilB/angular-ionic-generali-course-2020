import { BookLanguage } from './book-language.enum';
import { Publisher } from '@app/shared/models/publisher.model';

export interface Book {
  id?: number;
  title: string;
  language: BookLanguage;
  edition?: string;
  publisher?: Publisher;
}
