import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  CardMedia,
  alpha
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import MapIcon from '@mui/icons-material/Map';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CloudIcon from '@mui/icons-material/Cloud';
import DevicesIcon from '@mui/icons-material/Devices';
import ApiIcon from '@mui/icons-material/Api';
import './FeaturesSection.css';

const features = [
  {
    title: 'Predictive Analytics',
    description: 'Advanced AI algorithms analyze historical data, weather patterns, and terrain information to predict fire risks with up to 95% accuracy.',
    icon: <BarChartIcon sx={{ fontSize: 50 }} />,
    color: '#3182ce'
  },
  {
    title: 'Interactive Risk Maps',
    description: 'Visualize fire risk levels across different regions with our interactive heatmaps and detailed geographic overlays.',
    icon: <MapIcon sx={{ fontSize: 50 }} />,
    color: '#38a169'
  },
  {
    title: 'Real-time Alerts',
    description: 'Receive instant notifications about high-risk areas, changing conditions, and potential fire outbreaks.',
    icon: <NotificationsActiveIcon sx={{ fontSize: 50 }} />,
    color: '#e53e3e'
  },
  {
    title: 'Weather Integration',
    description: 'Seamless integration with weather forecasting systems to incorporate wind, temperature, and humidity data in risk assessments.',
    icon: <CloudIcon sx={{ fontSize: 50 }} />,
    color: '#d69e2e'
  },
  {
    title: 'Multi-platform Access',
    description: 'Access your dashboard from any device with our responsive web interface and dedicated mobile applications.',
    icon: <DevicesIcon sx={{ fontSize: 50 }} />,
    color: '#805ad5'
  },
  {
    title: 'API Connectivity',
    description: 'Connect with existing systems through our comprehensive API for seamless data integration and extended functionality.',
    icon: <ApiIcon sx={{ fontSize: 50 }} />,
    color: '#dd6b20'
  }
];

const FeaturesSection = () => {
  return (
    <Box className="features-section" id="features">
      <Container maxWidth="lg">
        <Box className="section-header" sx={{ mb: 8, textAlign: 'center' }}>
          <Typography 
            variant="overline" 
            component="div" 
            className="section-badge"
          >
            POWERFUL FEATURES
          </Typography>
          <Typography 
            variant="h2" 
            component="h2" 
            className="section-title"
            sx={{ mb: 2 }}
          >
            Advanced Tools for Forest Protection
          </Typography>
          <Typography 
            variant="body1" 
            className="section-subtitle"
            sx={{ maxWidth: 700, mx: 'auto' }}
          >
            FireGuard AI combines cutting-edge technology with practical tools to help forestry departments, 
            environmental agencies, and conservation groups protect our natural resources.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="feature-card" elevation={0}>
                <CardContent>
                  <Box 
                    className="feature-icon-wrapper" 
                    sx={{ 
                      backgroundColor: alpha(feature.color, 0.1),
                      color: feature.color
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h3" className="feature-title">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" className="feature-description">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Box className="features-showcase" sx={{ mt: 10 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h3" sx={{ mb: 3 }}>
                Interactive Dashboard for Complete Oversight
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Our comprehensive dashboard provides a complete view of your monitored regions, 
                with detailed analytics, risk assessments, and historical comparisons.
              </Typography>
              <Typography variant="body1">
                The intuitive interface allows for quick identification of high-risk areas and 
                enables timely decision-making to prevent potential fire outbreaks.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className="dashboard-preview">
                {/* This is where a dashboard preview image would go */}
                {/* The image will be added via CSS as a background */}
                <Box className="dashboard-image-placeholder">
                  {/* Placeholder for dashboard image */}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesSection; 