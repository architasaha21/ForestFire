import { Box } from '@mui/material';
import Header from '../Header/Header';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import RoadmapSection from './RoadmapSection';
import CtaSection from './CtaSection';
import Footer from '../Footer/Footer';
import './HomePage.css';

const HomePage = () => {
  return (
    <Box className="home-page">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <RoadmapSection />
      <CtaSection />
      <Footer />
    </Box>
  );
};

export default HomePage; 