import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { StockData } from '../types/stock'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface PriceTrendChartProps {
  stocks: StockData[]
  selectedSymbol?: string
}

const PriceTrendChart = ({ stocks, selectedSymbol }: PriceTrendChartProps) => {
  const topStocks = [...stocks].sort((a, b) => b.price - a.price).slice(0, 8).reverse()

  const data = {
    labels: topStocks.map(s => s.symbol),
    datasets: [
      {
        label: 'Price (USD)',
        data: topStocks.map(s => s.price),
        backgroundColor: topStocks.map(s => 
          s.symbol === selectedSymbol ? 'rgba(59, 130, 246, 0.8)' : 'rgba(156, 163, 175, 0.5)'
        ),
        borderColor: topStocks.map(s => 
          s.symbol === selectedSymbol ? 'rgb(59, 130, 246)' : 'rgb(156, 163, 175)'
        ),
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Stock Price Comparison',
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `$${context.parsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value: any) => '$' + value.toFixed(2),
        },
      },
    },
  }

  return (
    <div className="h-64 w-full">
      <Bar data={data} options={options} />
    </div>
  )
}

export default PriceTrendChart
