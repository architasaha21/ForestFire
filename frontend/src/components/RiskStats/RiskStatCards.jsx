import { Box, Grid, Typography, Paper } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import './RiskStatCards.css';

const RiskStatCards = ({ stats }) => {
  const { highRiskCount, mediumRiskCount, lowRiskCount, accuracy } = stats;
  
  // Format numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  return (
    <Grid container spacing={2} className="stat-cards-container">
      <Grid item xs={12} sm={6} lg={3}>
        <Paper className="stat-card high-risk">
          <Box className="stat-content">
            <Typography variant="subtitle2" className="stat-title">
              High Risk Zones
            </Typography>
            <Typography variant="h4" className="stat-value">
              {formatNumber(highRiskCount)}
            </Typography>
            <Box className="trend-indicator positive">
              <TrendingUpIcon fontSize="small" />
              <Typography variant="caption">12 new today</Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
      
      <Grid item xs={12} sm={6} lg={3}>
        <Paper className="stat-card medium-risk">
          <Box className="stat-content">
            <Typography variant="subtitle2" className="stat-title">
              Medium Risk Zones
            </Typography>
            <Typography variant="h4" className="stat-value">
              {formatNumber(mediumRiskCount)}
            </Typography>
            <Box className="trend-indicator positive">
              <TrendingUpIcon fontSize="small" />
              <Typography variant="caption">24 new today</Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
      
      <Grid item xs={12} sm={6} lg={3}>
        <Paper className="stat-card low-risk">
          <Box className="stat-content">
            <Typography variant="subtitle2" className="stat-title">
              Low Risk Zones
            </Typography>
            <Typography variant="h4" className="stat-value">
              {formatNumber(lowRiskCount)}
            </Typography>
            <Box className="trend-indicator positive">
              <TrendingUpIcon fontSize="small" />
              <Typography variant="caption">132 new today</Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
      
      <Grid item xs={12} sm={6} lg={3}>
        <Paper className="stat-card accuracy">
          <Box className="stat-content">
            <Typography variant="subtitle2" className="stat-title">
              Prediction Accuracy
            </Typography>
            <Typography variant="h4" className="stat-value">
              {accuracy}%
            </Typography>
            <Box className="trend-indicator positive">
              <TrendingUpIcon fontSize="small" />
              <Typography variant="caption">+1.3% from last week</Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RiskStatCards; 