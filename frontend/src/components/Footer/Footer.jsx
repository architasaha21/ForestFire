import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  IconButton,
  Stack,
  Divider 
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import './Footer.css';

const Footer = () => {
  return (
    <Box component="footer" className="footer">
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box className="footer-brand">
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocalFireDepartmentIcon sx={{ color: 'error.main', mr: 1, fontSize: 32 }} />
                <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
                  FireGuard AI
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Advanced AI-powered forest fire prediction and monitoring system. Protecting our forests with cutting-edge technology.
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton aria-label="facebook" color="primary" size="small">
                  <FacebookIcon />
                </IconButton>
                <IconButton aria-label="twitter" color="primary" size="small">
                  <TwitterIcon />
                </IconButton>
                <IconButton aria-label="linkedin" color="primary" size="small">
                  <LinkedInIcon />
                </IconButton>
                <IconButton aria-label="github" color="primary" size="small">
                  <GitHubIcon />
                </IconButton>
              </Stack>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" component="h6" gutterBottom>
              Product
            </Typography>
            <ul className="footer-links">
              <li><Link href="#" color="inherit">Features</Link></li>
              <li><Link href="#" color="inherit">Pricing</Link></li>
              <li><Link href="#" color="inherit">Dashboard</Link></li>
              <li><Link href="#" color="inherit">API</Link></li>
            </ul>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" component="h6" gutterBottom>
              Resources
            </Typography>
            <ul className="footer-links">
              <li><Link href="#" color="inherit">Documentation</Link></li>
              <li><Link href="#" color="inherit">Tutorials</Link></li>
              <li><Link href="#" color="inherit">Blog</Link></li>
              <li><Link href="#" color="inherit">Support</Link></li>
            </ul>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" component="h6" gutterBottom>
              Company
            </Typography>
            <ul className="footer-links">
              <li><Link href="#" color="inherit">About Us</Link></li>
              <li><Link href="#" color="inherit">Careers</Link></li>
              <li><Link href="#" color="inherit">Contact</Link></li>
              <li><Link href="#" color="inherit">Partners</Link></li>
            </ul>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" component="h6" gutterBottom>
              Legal
            </Typography>
            <ul className="footer-links">
              <li><Link href="#" color="inherit">Privacy</Link></li>
              <li><Link href="#" color="inherit">Terms</Link></li>
              <li><Link href="#" color="inherit">Cookies</Link></li>
              <li><Link href="#" color="inherit">Licenses</Link></li>
            </ul>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        
        <Box className="footer-bottom">
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} FireGuard AI. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Made with ❤️ for forest conservation
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 