# Stock Price Dashboard

A stock price dashboard built with React, TypeScript, and Tailwind CSS. Displays real-time stock market data from Finnhub API.

## Features

### Core Requirements
- Stock data table with symbol, price, and % change
- React + TypeScript
- Tailwind CSS for styling
- Finnhub API integration

### Additional Features
- Loading spinner while fetching data
- Error handling with dismissible messages
- Real-time search by stock symbol
- Sortable columns (click headers to sort)
- Price comparison chart
- Percentage change chart
- Add/remove stocks from the dashboard
- Click stock row to view details in modal
- Auto-refresh every 30 seconds (toggle on/off)
- Manual refresh button
- Responsive design

## Getting Started

### Prerequisites
- Node.js v18 or higher
- npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd valueglance_take_home_coding
```

2. Install dependencies:
```bash
npm install
```

3. Set up API key:
   - Get a free API key from [Finnhub](https://finnhub.io/)
   - Create a `.env` file in the root directory:
   ```
   VITE_FINNHUB_API_KEY=your_api_key_here
   ```
   - The app works with demo key but has rate limits

4. Start the dev server:
```bash
npm run dev
```

5. Open `http://localhost:5173` in your browser

### Build

```bash
npm run build
```

Output will be in the `dist` directory.

## Deployment

The app is deployed on Vercel:

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Add environment variable `VITE_FINNHUB_API_KEY`
5. Click "Deploy"

## Project Structure

```
src/
├── components/
│   ├── StockDashboard.tsx
│   ├── StockTable.tsx
│   ├── StockDetailModal.tsx
│   ├── PriceTrendChart.tsx
│   ├── ChangePercentChart.tsx
│   ├── SearchBar.tsx
│   ├── LoadingSpinner.tsx
│   └── ErrorMessage.tsx
├── services/
│   └── stockApi.ts
├── types/
│   └── stock.ts
├── App.tsx
├── main.tsx
└── index.css
```

## API

Uses [Finnhub API](https://finnhub.io/) for stock market data.

Free tier limits:
- 60 API calls/minute
- Real-time stock quotes

To get an API key:
1. Visit https://finnhub.io/
2. Sign up for free
3. Get API key from dashboard
4. Add to `.env` as `VITE_FINNHUB_API_KEY`

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Chart.js
- React-Chartjs-2
- Finnhub API
