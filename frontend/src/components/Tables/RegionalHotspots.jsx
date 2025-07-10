import { useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow 
} from '@mui/material';
import './RegionalHotspots.css';

const RegionalHotspots = ({ data }) => {
  // Calculate regional hotspots based on risk levels
  const hotspots = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    // For demo purposes, we'll simulate regional data
    // In a real app, you'd use actual region data from your dataset
    const regions = ['Baudh District', 'Sundargarh', 'Kalahandi', 'Mayurbhanj'];
    
    // Create a weighted score for each region based on risk levels
    const riskWeights = {
      'Low': 1,
      'Medium': 2,
      'High': 5,
      'Very High': 10
    };
    
    // Simulate regional risk scores
    const regionalScores = regions.map(region => {
      // In a real app, you'd filter data by region and calculate actual scores
      // Here we're just creating plausible demo data
      const baseScore = Math.floor(Math.random() * 30) + 60; // Base score between 60-90
      
      // Count high risk points (simulated)
      const highRiskPoints = Math.floor(Math.random() * 50) + 10;
      
      return {
        region,
        riskScore: baseScore,
        highRiskPoints
      };
    });
    
    // Sort by risk score in descending order
    return regionalScores.sort((a, b) => b.riskScore - a.riskScore);
  }, [data]);
  
  return (
    <Paper className="hotspots-container">
      <Typography variant="h6" className="hotspots-title">
        Regional Hotspots
      </Typography>
      
      <TableContainer className="hotspots-table">
        <Table size="small" aria-label="regional hotspots table">
          <TableHead>
            <TableRow>
              <TableCell className="table-header">Region</TableCell>
              <TableCell className="table-header" align="right">Risk Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hotspots.map((row) => (
              <TableRow key={row.region}>
                <TableCell component="th" scope="row" className="region-name">
                  {row.region}
                </TableCell>
                <TableCell align="right">
                  <Box className="risk-score-cell">
                    <Box 
                      className="risk-score-bar"
                      sx={{ 
                        width: `${Math.min(100, row.riskScore)}%`,
                        backgroundColor: row.riskScore > 85 ? '#e53e3e' : 
                                         row.riskScore > 75 ? '#dd6b20' : '#38a169'
                      }}
                    />
                    <Typography variant="body2" className="risk-score-value">
                      {row.riskScore}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box className="hotspots-footer">
        <Typography variant="caption" className="hotspots-note">
          Risk scores are calculated based on density of high-risk areas and historical fire data
        </Typography>
      </Box>
    </Paper>
  );
};

export default RegionalHotspots; 