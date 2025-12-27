export interface StockData {
  symbol: string
  price: number
  changePercent: number
  change: number
  previousClose?: number
}

export interface FinnhubQuote {
  c: number // current price
  d: number // change
  dp: number // percent change
  h: number // high price
  l: number // low price
  o: number // open price
  pc: number // previous close
  t: number // timestamp
}


