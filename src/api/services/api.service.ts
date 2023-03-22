import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class ApiService {
      async convert(amount: number, from: string, to: string): Promise<any> {
        const url = `https://wise.com/fr/currency-converter/${from}-to-${to}-rate?amount=${amount}`;
        const response = await axios.get(url);
        const html = response.data; 
        const $ = cheerio.load(html);
        let targetInputValue: string;
    
        $('.form-group > div').each((_, element) => {
          const text = $(element).text().trim();
          if (text.toLowerCase().includes(to)) {
            targetInputValue = text;
            return false; 
          }
        });
             
        return {
          from: from,
          to: to,
          amount: amount,
          result: targetInputValue,
        }
    }
}
