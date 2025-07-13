import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid,
  Paper
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './CtaSection.css';

const CtaSection = () => {
  return (
    <Box className="cta-section" id="contact">
      <Container maxWidth="lg">
        <Paper className="cta-paper" elevation={0}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h3" component="h2" className="cta-title" gutterBottom>
                Ready to protect your forests?
              </Typography>
              <Typography variant="body1" className="cta-subtitle">
                Join hundreds of forestry departments and environmental agencies already using 
                FireGuard AI to predict and prevent forest fires.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <Button 
                variant="contained" 
                color="error" 
                size="large"
                endIcon={<ArrowForwardIcon />}
                className="cta-button"
                component={RouterLink}
                to="/dashboard"
              >
                Get Started Today
              </Button>
            </Grid>
          </Grid>
          
          <Box className="cta-background-element cta-element-1"></Box>
          <Box className="cta-background-element cta-element-2"></Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default CtaSection; 