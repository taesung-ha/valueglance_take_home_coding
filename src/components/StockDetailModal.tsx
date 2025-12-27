import { StockData } from '../types/stock'

interface StockDetailModalProps {
  stock: StockData | null
  onClose: () => void
}

const StockDetailModal = ({ stock, onClose }: StockDetailModalProps) => {
  if (!stock) return null

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{stock.symbol}</h2>
              <p className="text-gray-600">Stock Details</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Current Price</p>
              <p className="text-2xl font-bold text-gray-800">{formatPrice(stock.price)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Change</p>
              <p className={`text-2xl font-bold ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercent(stock.changePercent)}
              </p>
              <p className="text-sm text-gray-600">
                {stock.change >= 0 ? '+' : ''}{formatPrice(stock.change)}
              </p>
            </div>
            {stock.previousClose && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Previous Close</p>
                <p className="text-xl font-semibold text-gray-800">{formatPrice(stock.previousClose)}</p>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StockDetailModal
