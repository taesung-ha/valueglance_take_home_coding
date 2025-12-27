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

interface ChangePercentChartProps {
  stocks: StockData[]
}

const ChangePercentChart = ({ stocks }: ChangePercentChartProps) => {
  const sortedStocks = [...stocks].sort((a, b) => b.changePercent - a.changePercent)

  const data = {
    labels: sortedStocks.map(stock => stock.symbol),
    datasets: [
      {
        label: '% Change',
        data: sortedStocks.map(stock => stock.changePercent),
        backgroundColor: sortedStocks.map(stock => 
          stock.changePercent >= 0 ? 'rgba(34, 197, 94, 0.7)' : 'rgba(239, 68, 68, 0.7)'
        ),
        borderColor: sortedStocks.map(stock => 
          stock.changePercent >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'
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
        text: 'Stock Price Change (%)',
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.parsed.y
            return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value: any) => value.toFixed(2) + '%',
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

export default ChangePercentChart

