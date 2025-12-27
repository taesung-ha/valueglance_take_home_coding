import StockDashboard from './components/StockDashboard'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Stock Price Dashboard
          </h1>
          <p className="text-gray-600">Real-time stock market data</p>
        </header>
        <StockDashboard />
      </div>
    </div>
  )
}

export default App


