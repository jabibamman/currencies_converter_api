import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class AppService {
  async RMB2EUR(amount: number): Promise<any> {
 
    // scrap https://wise.com/fr/currency-converter/cny-to-eur-rate?amount={amount}
    // return the result
    const url = `https://wise.com/fr/currency-converter/cny-to-eur-rate?amount=${amount}`;
    const response = await axios.get(url);
    const html = response.data; 
    const $ = cheerio.load(html);
    let targetInputValue: string;

    // Utilisez le sélecteur CSS pour sélectionner la div à l'intérieur du form-group
    $('.form-group > div').each((_, element) => {
      const text = $(element).text().trim();

      // Vérifier si le texte contient 'eur'
      if (text.toLowerCase().includes('eur')) {
        // Récupérer la valeur numérique
        targetInputValue = text.replace(/[^0-9.]/g, '');
        return false; // Arrêter la boucle .each()
      }
    });

      console.log(targetInputValue + '€' + ' amount: ' + amount);
      
    
        return {
          from: 'CNY',
          to: 'EUR',
          amount: amount,
          result: targetInputValue + '€',
        }
  }
}
