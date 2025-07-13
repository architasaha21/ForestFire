import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningIcon from '@mui/icons-material/Warning';
import PublicIcon from '@mui/icons-material/Public';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import GroupsIcon from '@mui/icons-material/Groups';
import CloudIcon from '@mui/icons-material/Cloud';
import FlightIcon from '@mui/icons-material/Flight';
import './RoadmapSection.css';

const RoadmapSection = () => {
  const plannedFeatures = [
    {
      icon: <SmartphoneIcon />,
      text: 'Mobile app with push notifications for high-risk areas'
    },
    {
      icon: <GroupsIcon />,
      text: 'Integration with local fire departments and emergency services'
    },
    {
      icon: <WarningIcon />,
      text: 'Community reporting system for ground-truth validation'
    },
    {
      icon: <CloudIcon />,
      text: 'Advanced weather pattern analysis using AI'
    },
    {
      icon: <FlightIcon />,
      text: 'Drone surveillance integration for remote monitoring'
    }
  ];

  return (
    <Box className="roadmap-section" id="roadmap">
      <Container maxWidth="lg">
        <Box className="section-header" sx={{ mb: 8, textAlign: 'center' }}>
          <Typography 
            variant="overline" 
            component="div" 
            className="section-badge"
          >
            FUTURE VISION
          </Typography>
          <Typography 
            variant="h2" 
            component="h2" 
            className="section-title"
            sx={{ mb: 2 }}
          >
            <TrendingUpIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
            Future Roadmap
          </Typography>
          <Typography 
            variant="body1" 
            className="section-subtitle"
            sx={{ maxWidth: 700, mx: 'auto' }}
          >
            Our commitment to innovation drives our ambitious roadmap for FireGuard AI.
            Here's what we're working on to make forest fire prediction even more effective.
          </Typography>
        </Box>
        
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Paper className="roadmap-card" elevation={0}>
              <Box className="roadmap-card-header">
                <WarningIcon color="warning" sx={{ fontSize: 32, mr: 2 }} />
                <Typography variant="h4" component="h3">
                  Real-time Integration
                </Typography>
              </Box>
              <Typography variant="body1" className="roadmap-description">
                We're working on integrating real-time satellite data, weather APIs, and IoT sensors to provide live fire risk
                assessments updated every hour.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper className="roadmap-card" elevation={0}>
              <Box className="roadmap-card-header">
                <PublicIcon color="primary" sx={{ fontSize: 32, mr: 2 }} />
                <Typography variant="h4" component="h3">
                  Pan-India Expansion
                </Typography>
              </Box>
              <Typography variant="body1" className="roadmap-description">
                Our ultimate goal is to expand coverage to all Indian states, creating a comprehensive national fire risk monitoring
                system.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Paper className="roadmap-features-card" elevation={0}>
              <Typography variant="h5" component="h3" sx={{ mb: 3 }}>
                Planned Features:
              </Typography>
              <List>
                {plannedFeatures.map((feature, index) => (
                  <ListItem key={index} className="roadmap-list-item">
                    <ListItemIcon className="roadmap-list-icon">
                      {feature.icon}
                    </ListItemIcon>
                    <ListItemText primary={feature.text} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default RoadmapSection; 