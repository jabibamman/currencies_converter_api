import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class ApiService {
      async convert(amount: number, from: string, to: string): Promise<any> {
        const url = `https://wise.com/fr/currency-converter/${from}-to-${to}-rate?amount=${amount}`;
        const response = await axios.get(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
          },
        });
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
