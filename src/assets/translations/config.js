import { englishDictionary } from './en';
import { spanishDictionary } from './es';
import { italianDictionary } from './it';

class Translations {
  constructor() {
    this.dictionary = englishDictionary;
  }
  setDictionary(language) {
    // 1 => english, 2 => spanish, 3 => italian
    // console.log(this.language)
    if (language === 1) this.dictionary = englishDictionary;
    if (language === 2) this.dictionary = spanishDictionary;
    if (language === 3) this.dictionary = italianDictionary;
    // console.log(this.dictionary)
  }
}
const translations = new Translations();

export translations;