# Stock Price Dashboard

A modern, responsive stock price dashboard built with React, TypeScript, and Tailwind CSS. This application displays real-time stock market data from Finnhub API.

## Features

### Core Requirements
- **Stock Data Table**: Displays stock symbol, price, and % change
- **React + TypeScript**: Built with modern React and TypeScript
- **Tailwind CSS**: Fully styled with Tailwind CSS, responsive design
- **API Integration**: Fetches data from Finnhub free stock API

### Additional Features
- **Loading States**: Spinner and loading indicators during data fetch
- **Error Handling**: User-friendly error messages with dismiss functionality
- **Search Functionality**: Real-time search by stock symbol
- **Sorting**: Click column headers to sort by symbol, price, or % change
- **Auto-refresh**: Automatically updates stock data every 30 seconds (toggleable)
- **Manual Refresh**: Button to manually refresh data
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with gradient backgrounds and smooth transitions

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

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

3. Set up API key (optional but recommended):
   - Get a free API key from [Finnhub](https://finnhub.io/)
   - Create a `.env` file in the root directory:
   ```
   VITE_FINNHUB_API_KEY=your_api_key_here
   ```
   - Note: The app will work with a demo key, but it has rate limits

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Add environment variable `VITE_FINNHUB_API_KEY` if you have one
5. Click "Deploy"

### Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com) and sign in
3. Click "New site from Git" and select your repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Add environment variable `VITE_FINNHUB_API_KEY` if you have one
7. Click "Deploy site"

### GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Run `npm run deploy`

## Project Structure

```
src/
├── components/
│   ├── StockDashboard.tsx    # Main dashboard component
│   ├── StockTable.tsx        # Table component with sorting
│   ├── SearchBar.tsx         # Search input component
│   ├── LoadingSpinner.tsx    # Loading indicator
│   └── ErrorMessage.tsx      # Error display component
├── services/
│   └── stockApi.ts           # API service for fetching stock data
├── types/
│   └── stock.ts              # TypeScript type definitions
├── App.tsx                   # Root component
├── main.tsx                  # Entry point
└── index.css                 # Global styles with Tailwind
```

## API Information

This project uses the [Finnhub API](https://finnhub.io/) for stock market data. The free tier includes:
- 60 API calls/minute
- Real-time stock quotes
- No credit card required

To get your own API key:
1. Visit https://finnhub.io/
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env` file as `VITE_FINNHUB_API_KEY`

## Technologies Used

- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Finnhub API**: Stock market data provider

## License

MIT


