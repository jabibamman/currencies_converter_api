import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { CurrenciesListLink } from '../../Common/Constants/Url.constants';

@Injectable()
export class CurrencyService {
  async fetchCurrencyValues(): Promise<string[]> {
    const url = CurrenciesListLink;

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const regex = /(_currencyCard__currencyCode_)\w+/;
    // regex pour prévenir les changements de nom de classe
    const allHeadings = $('h5');

    const currencyCodeElements = allHeadings.filter((index, element) => {
      const classNames = $(element).attr('class');
      return regex.test(classNames);
    });

    const currencyCodes: string[] = [];
    currencyCodeElements.each(function(this: cheerio.Element, i, elem) {
      const text = $(this).text().trim();
      currencyCodes.push(text);
   })

    return currencyCodes.sort();
  }
}
