# FireGuard AI - Wildfire Risk Visualization Dashboard

A modern React dashboard for visualizing wildfire risk prediction data from the FireGuard AI model.

## Features

- Interactive map visualization of wildfire risk data
- Risk level filtering and regional selection
- Statistical overview of high, medium, and low risk areas
- Risk distribution analysis
- Regional hotspots identification
- Dark-themed, responsive UI designed for monitoring centers

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Dashboard/       # Main dashboard container
│   │   ├── Sidebar/         # Filters and controls
│   │   ├── RiskStats/       # Risk statistics cards
│   │   ├── Map/             # Map visualization using react-map-gl and deck.gl
│   │   ├── Charts/          # D3-based charts for risk distribution
│   │   └── Tables/          # Regional hotspots table
│   ├── utils/               # Utility functions
│   ├── App.jsx              # Main application component
│   └── main.jsx             # Application entry point
└── public/                  # Static assets
```

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- NPM or Yarn
- A Mapbox API token for the map visualization

### Installation

1. Clone the repository
2. Navigate to the frontend directory
3. Install dependencies:

```bash
npm install
# or
yarn
```

4. Create a `.env` file in the root directory with your Mapbox token:

```
VITE_MAPBOX_TOKEN=your_mapbox_token_here
```

5. Update the `MAPBOX_TOKEN` variable in `src/components/Map/FireRiskMap.jsx` with your token or use the environment variable.

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`.

### Production Build

Create a production build:

```bash
npm run build
# or
yarn build
```

The build files will be in the `dist` directory.

## Data Integration

### Converting NPZ to JSON

The dashboard expects fire risk data in JSON format. Use the provided Python script to convert NPZ data:

```bash
python app/npz_to_json_converter.py --input path/to/your/data.npz --output public/data/fire_risk_data.json
```

For large datasets, you can split the output into chunks:

```bash
python app/npz_to_json_converter.py --input path/to/your/data.npz --output public/data/fire_risk_data.json --chunk-size 100000
```

### Expected JSON Format

```json
[
  {
    "latitude": 34.123,
    "longitude": -118.123,
    "risk": "Low"
  },
  {
    "latitude": 34.543,
    "longitude": -118.543,
    "risk": "High"
  }
]
```

## Technologies Used

- React
- Material UI
- react-map-gl & deck.gl for mapping
- D3.js for charts
- Vite for build tooling

## License

MIT
