# List of Endpoints

## Endpoints

- [List of Endpoints](#list-of-endpoints)
  - [Endpoints](#endpoints)
  - [/API](#api)
    - [/currencies](#currencies)
    - [/convert/:amount/:from/:to](#convertamountfromto)
  - [Examples](#examples)


## /API

### /currencies

Usage : `GET /currencies`

Return the list of available currencies.

### /convert/:amount/:from/:to

Usage : `GET /convert/:amount/:from/:to`

Example : `GET /convert/100/eur/usd`

Convert a value from a currency to another.

Parameter :

- `amount` : Value to convert
- `from` : Currency to convert
- `to` : Currency to convert to


## Examples

  - `127.0.0.1:3000/api/convert/100/eur/usd`
  - `127.0.0.1:3000/api/currencies`




