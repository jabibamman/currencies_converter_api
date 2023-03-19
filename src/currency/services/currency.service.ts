import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class CurrencyService {
  async fetchCurrencyValues(): Promise<string[]> {
    const url = 'https://www.donneesmondiales.com/devises/';

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const table = $('.std100.hover');
    const rows = table.find('tr');
    const firstColumnValues: string[] = ["eur"];

    rows.each((index, row) => {
      const cells = $(row).find('td');
      if (cells.length > 0) {
        firstColumnValues.push($(cells[0]).text().toLowerCase());
      }
    });

    return firstColumnValues.sort();
  }
}
