/**
 * Utility to create mock fire risk data for development
 * This simulates the JSON data that would be converted from the NPZ file
 */

export const createMockData = () => {
  // Check if we already created the mock data
  try {
    // In a real app, you'd check if the file exists
    // For now, we'll just create it every time in development
    
    const mockData = generateMockFireRiskData();
    
    // In a real app, you'd write this to a file
    // For now, we'll store it in localStorage for the demo
    localStorage.setItem('mockFireRiskData', JSON.stringify(mockData));
    
    console.log(`Created mock data with ${mockData.length} points`);
  } catch (error) {
    console.error('Error creating mock data:', error);
  }
};

/**
 * Generate mock fire risk data points
 * @param {number} count - Number of data points to generate
 * @returns {Array} Array of fire risk data points
 */
export const generateMockFireRiskData = (count = 10000) => {
  const riskLevels = ['Low', 'Medium', 'High', 'Very High'];
  const riskDistribution = [0.7, 0.2, 0.08, 0.02]; // 70% Low, 20% Medium, 8% High, 2% Very High
  
  // Center coordinates for Odisha, India
  const centerLat = 20.9517;
  const centerLon = 84.8700;
  const spreadFactor = 3; // Degrees of spread
  
  const data = [];
  
  for (let i = 0; i < count; i++) {
    // Generate random coordinates within the region
    const latitude = centerLat + (Math.random() * spreadFactor * 2 - spreadFactor);
    const longitude = centerLon + (Math.random() * spreadFactor * 2 - spreadFactor);
    
    // Determine risk level based on distribution
    const rand = Math.random();
    let risk;
    let cumulative = 0;
    
    for (let j = 0; j < riskDistribution.length; j++) {
      cumulative += riskDistribution[j];
      if (rand <= cumulative) {
        risk = riskLevels[j];
        break;
      }
    }
    
    // Create clusters of high risk areas
    if (i % 100 === 0) {
      // Create a cluster of high risk points
      const clusterCenterLat = centerLat + (Math.random() * spreadFactor * 2 - spreadFactor);
      const clusterCenterLon = centerLon + (Math.random() * spreadFactor * 2 - spreadFactor);
      
      // Add 20-50 high risk points in this cluster
      const clusterSize = Math.floor(Math.random() * 30) + 20;
      const clusterSpread = 0.2; // Smaller spread for the cluster
      
      for (let k = 0; k < clusterSize; k++) {
        const clusterLat = clusterCenterLat + (Math.random() * clusterSpread * 2 - clusterSpread);
        const clusterLon = clusterCenterLon + (Math.random() * clusterSpread * 2 - clusterSpread);
        
        // 80% High, 20% Very High in clusters
        const clusterRisk = Math.random() < 0.8 ? 'High' : 'Very High';
        
        data.push({
          latitude: clusterLat,
          longitude: clusterLon,
          risk: clusterRisk
        });
      }
    }
    
    // Add the regular point
    data.push({
      latitude,
      longitude,
      risk
    });
  }
  
  return data;
};

// Export a function to get the mock data
export const getMockData = () => {
  const data = localStorage.getItem('mockFireRiskData');
  return data ? JSON.parse(data) : generateMockFireRiskData();
}; 