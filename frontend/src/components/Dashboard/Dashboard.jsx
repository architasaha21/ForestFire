import { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import RiskStatCards from '../RiskStats/RiskStatCards';
import FireRiskMap from '../Map/FireRiskMap';
import RiskDistributionChart from '../Charts/RiskDistributionChart';
import RegionalHotspots from '../Tables/RegionalHotspots';
import { getMockData } from '../../utils/createMockData';
import './Dashboard.css';

const Dashboard = () => {
  const [fireData, setFireData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRiskLevels, setSelectedRiskLevels] = useState(['Low', 'Medium', 'High', 'Very High']);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [analysisDate, setAnalysisDate] = useState(new Date().toISOString().split('T')[0]);

  // Stats for the dashboard
  const [stats, setStats] = useState({
    highRiskCount: 0,
    mediumRiskCount: 0,
    lowRiskCount: 0,
    accuracy: 92.7
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In development, use mock data
        // In production, you would fetch from your API
        let data;
        const response = await fetch('/data/fire_risk_data.json');
        data = await response.json();

        
        setFireData(data);
        
        // Calculate stats
        const highRisk = data.filter(item => item.risk === 'High' || item.risk === 'Very High').length;
        const mediumRisk = data.filter(item => item.risk === 'Medium').length;
        const lowRisk = data.filter(item => item.risk === 'Low').length;
        
        setStats({
          highRiskCount: highRisk,
          mediumRiskCount: mediumRisk,
          lowRiskCount: lowRisk,
          accuracy: 92.7 // This would come from your model evaluation
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching fire risk data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data based on selected risk levels and region
  const filteredData = fireData.filter(item => {
    const riskMatch = selectedRiskLevels.includes(item.risk);
    const regionMatch = selectedRegion === 'All' || item.region === selectedRegion;
    return riskMatch && regionMatch;
  });

  return (
    <Box className="dashboard-container">
      <Sidebar 
        selectedRiskLevels={selectedRiskLevels}
        setSelectedRiskLevels={setSelectedRiskLevels}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        analysisDate={analysisDate}
        setAnalysisDate={setAnalysisDate}
      />
      
      <Box className="dashboard-content">
        <Box className="dashboard-header">
          <Typography variant="h4" component="h1" className="dashboard-title">
            <span role="img" aria-label="fire">🔥</span> FireGuard AI - Predictive Forest Fire Monitoring
          </Typography>
          <Typography variant="subtitle1" className="dashboard-subtitle">
            Real-time fire risk prediction and visualization system
          </Typography>
        </Box>

        <RiskStatCards stats={stats} />
        
        <Box className="map-container">
          <Typography variant="h5" component="h2" className="section-title">
            Fire Risk Heatmap
          </Typography>
          <Typography variant="body2" className="data-point-count">
            Showing {filteredData.length} data points
          </Typography>
          
          {loading ? (
            <Box className="loading-indicator">Loading map data...</Box>
          ) : (
            <FireRiskMap data={filteredData} />
          )}
        </Box>
        
        <Grid container spacing={3} className="analysis-section">
          <Grid item xs={12} md={7}>
            <RiskDistributionChart data={filteredData} />
          </Grid>
          <Grid item xs={12} md={5}>
            <RegionalHotspots data={filteredData} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard; 