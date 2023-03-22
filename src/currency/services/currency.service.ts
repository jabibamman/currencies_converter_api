import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class CurrencyService {
  async fetchCurrencyValues(): Promise<string[]> {
    const url = 'https://wise.com/fr/currency-converter/currencies';

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const regex = /currencies_currencyCard__currencyCode__\w+/;

    // regex pour prévenir les changements de nom de classe
    const allHeadings = $('h5');
    const currencyCodeElements = allHeadings.filter((index, element) => {
      const classNames = $(element).attr('class');
      return regex.test(classNames);
    });

    const currencyCodes: string[] = [];

    currencyCodeElements.each((index, element) => {
      currencyCodes.push($(element).text().trim());
    });

    return currencyCodes.sort();
  }
}
