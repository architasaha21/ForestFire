import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid,
  Stack
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <Box className="hero-section">
      {/* Background overlay will be added via CSS */}
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" sx={{ minHeight: '90vh' }}>
          <Grid item xs={12} md={6}>
            <Box className="hero-content">
              <Typography 
                variant="overline" 
                component="div" 
                className="hero-badge"
                sx={{ mb: 2 }}
              >
                AI-POWERED FOREST FIRE PREDICTION
              </Typography>
              
              <Typography 
                variant="h1" 
                component="h1" 
                className="hero-title"
                sx={{ mb: 3 }}
              >
                Protect Forests with <span className="text-gradient">Predictive AI</span>
              </Typography>
              
              <Typography 
                variant="body1" 
                component="p" 
                className="hero-subtitle"
                sx={{ mb: 4, maxWidth: '90%' }}
              >
                FireGuard AI uses advanced machine learning algorithms to predict, monitor, and prevent forest fires before they happen. Get real-time risk assessments and actionable insights.
              </Typography>
              
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button 
                  variant="contained" 
                  color="error" 
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  className="hero-button"
                  component={RouterLink}
                  to="/dashboard"
                >
                  Get Started
                </Button>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  size="large"
                  className="hero-button-secondary"
                  component={RouterLink}
                  to="/#features"
                >
                  View Features
                </Button>
              </Stack>
              
              <Box className="hero-stats" sx={{ mt: 6 }}>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <Typography variant="h3" component="div" className="stat-number">
                      95%
                    </Typography>
                    <Typography variant="body2" component="div" className="stat-label">
                      Prediction Accuracy
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h3" component="div" className="stat-number">
                      2.5M
                    </Typography>
                    <Typography variant="body2" component="div" className="stat-label">
                      Acres Protected
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h3" component="div" className="stat-number">
                      24/7
                    </Typography>
                    <Typography variant="body2" component="div" className="stat-label">
                      Real-time Monitoring
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box className="hero-image-container">
              {/* This is where a hero image would go */}
              {/* The image will be added via CSS as a background */}
              <Box className="hero-image-placeholder">
                {/* Placeholder for hero image */}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection; 