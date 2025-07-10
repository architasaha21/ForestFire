import { useState } from 'react';
import { 
  Box, 
  Typography, 
  FormControl, 
  FormGroup, 
  FormControlLabel, 
  Checkbox,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  Tooltip
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import './Sidebar.css';

const riskLevels = ['Low', 'Medium', 'High', 'Very High'];
const regions = ['All', 'Baudh District', 'Sundargarh', 'Kalahandi', 'Mayurbhanj', 'Odisha'];

const Sidebar = ({ 
  selectedRiskLevels, 
  setSelectedRiskLevels, 
  selectedRegion, 
  setSelectedRegion,
  analysisDate,
  setAnalysisDate
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleRiskLevelChange = (level) => {
    if (selectedRiskLevels.includes(level)) {
      setSelectedRiskLevels(selectedRiskLevels.filter(item => item !== level));
    } else {
      setSelectedRiskLevels([...selectedRiskLevels, level]);
    }
  };

  const handleRemoveRiskLevel = (level) => {
    setSelectedRiskLevels(selectedRiskLevels.filter(item => item !== level));
  };

  const handleDateChange = (newDate) => {
    if (newDate) {
      const formattedDate = newDate.toISOString().split('T')[0];
      setAnalysisDate(formattedDate);
    }
  };

  return (
    <Box className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
      <Box className="sidebar-header">
        <Typography variant="h6" component="h2">
          Filters & Controls
        </Typography>
        <IconButton 
          className="toggle-sidebar" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          size="small"
        >
          {sidebarOpen ? <CloseIcon /> : null}
        </IconButton>
      </Box>

      <Box className="sidebar-section">
        <Box className="section-header">
          <Typography variant="subtitle2">Analysis Date</Typography>
          <Tooltip title="Select the date for which you want to view fire risk data">
            <IconButton size="small">
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={analysisDate ? new Date(analysisDate) : null}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} fullWidth size="small" />}
            className="date-picker"
          />
        </LocalizationProvider>
      </Box>

      <Box className="sidebar-section">
        <Box className="section-header">
          <Typography variant="subtitle2">Select risk levels to display:</Typography>
          <Tooltip title="Filter data points by risk level">
            <IconButton size="small">
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        
        <Box className="selected-filters">
          {selectedRiskLevels.map(level => (
            <Box key={level} className={`filter-chip ${level.toLowerCase()}`}>
              {level}
              <IconButton 
                size="small" 
                onClick={() => handleRemoveRiskLevel(level)}
                className="remove-filter"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
        
        <FormControl component="fieldset" className="risk-level-form">
          <FormGroup>
            {riskLevels.map(level => (
              <FormControlLabel
                key={level}
                control={
                  <Checkbox 
                    checked={selectedRiskLevels.includes(level)} 
                    onChange={() => handleRiskLevelChange(level)}
                    size="small"
                    className={`risk-checkbox ${level.toLowerCase()}`}
                  />
                }
                label={level}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Box>

      <Box className="sidebar-section">
        <Box className="section-header">
          <Typography variant="subtitle2">Select Region</Typography>
        </Box>
        <FormControl fullWidth size="small">
          <Select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            displayEmpty
            className="region-select"
          >
            {regions.map(region => (
              <MenuItem key={region} value={region}>{region}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box className="sidebar-footer">
        <Typography variant="caption" className="last-updated">
          Last updated: {new Date().toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar; 