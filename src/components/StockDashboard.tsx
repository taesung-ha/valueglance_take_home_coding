import { useState, useEffect, useCallback } from 'react'
import { StockData } from '../types/stock'
import { fetchMultipleStocks, getDefaultSymbols, fetchSingleStock } from '../services/stockApi'
import StockTable from './StockTable'
import SearchBar from './SearchBar'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'
import PriceTrendChart from './PriceTrendChart'
import ChangePercentChart from './ChangePercentChart'
import StockDetailModal from './StockDetailModal'

type SortField = 'symbol' | 'price' | 'changePercent'
type SortDirection = 'asc' | 'desc'

const StockDashboard = () => {
  const [stocks, setStocks] = useState<StockData[]>([])
  const [filteredStocks, setFilteredStocks] = useState<StockData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [addStockInput, setAddStockInput] = useState('')
  const [addingStock, setAddingStock] = useState(false)
  const [sortField, setSortField] = useState<SortField>('symbol')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null)

  const loadStocks = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const symbols = getDefaultSymbols()
      const stockData = await fetchMultipleStocks(symbols)
      
      if (stockData.length === 0) {
        setError('No stock data available. Please check your API key.')
        return
      }

      setStocks(stockData)
      setFilteredStocks(stockData)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load stock data'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadStocks()
  }, [loadStocks])

  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      loadStocks()
    }, 30000)

    return () => clearInterval(interval)
  }, [autoRefresh, loadStocks])
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredStocks(stocks)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = stocks.filter(stock =>
      stock.symbol.toLowerCase().includes(query)
    )
    setFilteredStocks(filtered)
  }, [searchQuery, stocks])

  const sortedStocks = [...filteredStocks].sort((a, b) => {
    let comparison = 0
    
    if (sortField === 'symbol') {
      comparison = a.symbol.localeCompare(b.symbol)
    } else if (sortField === 'price') {
      comparison = a.price - b.price
    } else {
      comparison = a.changePercent - b.changePercent
    }
    
    return sortDirection === 'asc' ? comparison : -comparison
  })

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleRefresh = () => {
    loadStocks()
  }

  const handleAddStock = async () => {
    const symbol = addStockInput.trim().toUpperCase()
    if (!symbol) return

    if (stocks.some(s => s.symbol === symbol)) {
      setError(`${symbol} is already in the list.`)
      setAddStockInput('')
      return
    }

    setAddingStock(true)
    setError(null)

    try {
      const newStock = await fetchSingleStock(symbol)
      if (newStock) {
        setStocks(prev => [...prev, newStock])
        setFilteredStocks(prev => [...prev, newStock])
        setAddStockInput('')
      } else {
        setError(`Failed to fetch data for ${symbol}`)
      }
    } catch (err) {
      setError(`Failed to add ${symbol}`)
    } finally {
      setAddingStock(false)
    }
  }

  const handleRemoveStock = (symbol: string) => {
    setStocks(prev => prev.filter(s => s.symbol !== symbol))
    setFilteredStocks(prev => prev.filter(s => s.symbol !== symbol))
  }

  if (loading && stocks.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex-1 w-full sm:w-auto">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by symbol..."
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                autoRefresh
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Auto-refresh: {autoRefresh ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
        
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={addStockInput}
            onChange={(e) => setAddStockInput(e.target.value.toUpperCase())}
            onKeyPress={(e) => e.key === 'Enter' && handleAddStock()}
            placeholder="Add stock symbol (e.g., IBM)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={addingStock}
          />
          <button
            onClick={handleAddStock}
            disabled={addingStock || !addStockInput.trim()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {addingStock ? 'Adding...' : 'Add Stock'}
          </button>
        </div>
      </div>

      {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}


      {sortedStocks.length > 0 && (
        <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <PriceTrendChart stocks={sortedStocks} selectedSymbol={selectedStock?.symbol} />
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <ChangePercentChart stocks={sortedStocks} />
          </div>
        </div>
      )}

      {sortedStocks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No stocks found matching your search.
        </div>
      ) : (
        <StockTable
          stocks={sortedStocks}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onRemove={handleRemoveStock}
          onStockClick={setSelectedStock}
        />
      )}

      {selectedStock && (
        <StockDetailModal
          stock={selectedStock}
          onClose={() => setSelectedStock(null)}
        />
      )}
    </div>
  )
}

export default StockDashboard

