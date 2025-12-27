import { StockData, FinnhubQuote } from '../types/stock'

const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY || 'demo'
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1'

const DEFAULT_SYMBOLS = [
  'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NVDA', 'TSLA', 'NFLX',
  'JPM', 'V', 'JNJ', 'WMT', 'DIS'
]

export const fetchStockQuote = async (symbol: string): Promise<StockData> => {
  try {
    const url = `${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${symbol}: ${response.status} ${response.statusText}`)
    }

    const data: FinnhubQuote = await response.json()

    if (data.c === 0 || (data.c === null && data.d === null)) {
      throw new Error(`Invalid or unavailable data for ${symbol}`)
    }

    return {
      symbol,
      price: data.c,
      changePercent: data.dp,
      change: data.d,
      previousClose: data.pc,
    }
  } catch (error) {
    throw error
  }
}

export const fetchMultipleStocks = async (symbols: string[]): Promise<StockData[]> => {
  const results = await Promise.all(
    symbols.map(symbol => fetchStockQuote(symbol).catch(() => null))
  )
  return results.filter((stock): stock is StockData => stock !== null)
}

export const getDefaultSymbols = (): string[] => DEFAULT_SYMBOLS

export const fetchSingleStock = async (symbol: string): Promise<StockData | null> => {
  try {
    return await fetchStockQuote(symbol)
  } catch (error) {
    return null
  }
}


