import { StockData } from '../types/stock'

type SortField = 'symbol' | 'price' | 'changePercent'
type SortDirection = 'asc' | 'desc'

interface StockTableProps {
  stocks: StockData[]
  sortField: SortField
  sortDirection: SortDirection
  onSort: (field: SortField) => void
  onRemove?: (symbol: string) => void
  onStockClick?: (stock: StockData) => void
}

const StockTable = ({ stocks, sortField, sortDirection, onSort, onRemove, onStockClick }: StockTableProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)
  }

  const formatPercent = (percent: number) => {
    const sign = percent >= 0 ? '+' : ''
    return `${sign}${percent.toFixed(2)}%`
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null
    return <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              onClick={() => onSort('symbol')}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
            >
              Symbol {getSortIcon('symbol')}
            </th>
            <th
              onClick={() => onSort('price')}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
            >
              Price {getSortIcon('price')}
            </th>
            <th
              onClick={() => onSort('changePercent')}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
            >
              % Change {getSortIcon('changePercent')}
            </th>
            {onRemove && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {stocks.map((stock) => (
            <tr 
              key={stock.symbol} 
              className={`hover:bg-gray-50 transition-colors ${onStockClick ? 'cursor-pointer' : ''}`}
              onClick={() => onStockClick?.(stock)}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-semibold text-gray-900">{stock.symbol}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{formatPrice(stock.price)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div
                  className={`text-sm font-medium ${
                    stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {formatPercent(stock.changePercent)}
                </div>
                <div className="text-xs text-gray-500">
                  {stock.change >= 0 ? '+' : ''}{formatPrice(stock.change)}
                </div>
              </td>
              {onRemove && (
                <td 
                  className="px-6 py-4 whitespace-nowrap"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => onRemove(stock.symbol)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    ✕
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StockTable


