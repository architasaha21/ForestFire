import { useState, useCallback, useMemo } from 'react';
import Map, { NavigationControl, ScaleControl } from 'react-map-gl';
// import { StaticMap } from 'react-map-gl';
import DeckGL from 'deck.gl';
import { ScatterplotLayer } from '@deck.gl/layers';
import { Box, Typography, Paper } from '@mui/material';
import './FireRiskMap.css';

// Use environment variable for Mapbox token
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || 'YOUR_MAPBOX_TOKEN'; 

const RISK_COLORS = {
  'Low': [56, 161, 105, 180],      // Green with transparency
  'Medium': [221, 107, 32, 180],    // Orange with transparency
  'High': [229, 62, 62, 180],       // Red with transparency
  'Very High': [0, 0, 0, 200]       // Black with transparency
};

const INITIAL_VIEW_STATE = {
  longitude: 84.8700,  // Centered on Odisha, India
  latitude: 20.9517,
  zoom: 6,
  pitch: 0,
  bearing: 0
};

const FireRiskMap = ({ data }) => {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const [hoverInfo, setHoverInfo] = useState(null);

  // Create the scatterplot layer with the data
  const layers = useMemo(() => {
    return [
      new ScatterplotLayer({
        id: 'fire-risk-layer',
        data,
        pickable: true,
        opacity: 0.8,
        stroked: false,
        filled: true,
        radiusScale: 6,
        radiusMinPixels: 3,
        radiusMaxPixels: 15,
        getPosition: d => [d.longitude, d.latitude],
        getRadius: d => d.risk === 'High' || d.risk === 'Very High' ? 10 : 6,
        getFillColor: d => RISK_COLORS[d.risk] || [100, 100, 100, 180],
        onHover: info => setHoverInfo(info.object ? info : null)
      })
    ];
  }, [data]);

  const onViewStateChange = useCallback(({ viewState }) => {
    setViewState(viewState);
  }, []);

  return (
    <Box className="map-wrapper">
      <DeckGL
        layers={layers}
        initialViewState={INITIAL_VIEW_STATE}
        viewState={viewState}
        onViewStateChange={onViewStateChange}
        controller={true}
        getTooltip={({object}) => object && {
          html: `
            <div>
              <b>Risk Level:</b> ${object.risk}<br/>
              <b>Location:</b> ${object.latitude.toFixed(4)}, ${object.longitude.toFixed(4)}
            </div>
          `,
          style: {
            backgroundColor: '#1a202c',
            color: 'white',
            fontSize: '12px',
            padding: '8px'
          }
        }}
      >
        <Map
          mapboxAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v11"
          attributionControl={false}
        >
          <NavigationControl position="bottom-right" />
          <ScaleControl position="bottom-left" />
        </Map>
      </DeckGL>

      <Box className="map-legend">
        <Typography variant="subtitle2" className="legend-title">
          Forest Fire Risk Probability
        </Typography>
        <Box className="legend-items">
          {Object.entries(RISK_COLORS).map(([risk, color]) => (
            <Box key={risk} className="legend-item">
              <Box 
                className="legend-color" 
                sx={{ 
                  backgroundColor: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]/255})` 
                }}
              />
              <Typography variant="caption">{risk}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FireRiskMap; 