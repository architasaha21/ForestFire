import { useRef, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import * as d3 from 'd3';
import './RiskDistributionChart.css';

const RiskDistributionChart = ({ data }) => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    if (!data || data.length === 0) return;
    
    // Clear any existing chart
    d3.select(chartRef.current).selectAll('*').remove();
    
    // Count occurrences of each risk level
    const riskCounts = {};
    data.forEach(item => {
      if (!riskCounts[item.risk]) {
        riskCounts[item.risk] = 0;
      }
      riskCounts[item.risk]++;
    });
    
    // Convert to array for D3
    const chartData = Object.entries(riskCounts).map(([risk, count]) => ({
      risk,
      count
    }));
    
    // Sort by risk level (Low, Medium, High, Very High)
    const riskOrder = { 'Low': 0, 'Medium': 1, 'High': 2, 'Very High': 3 };
    chartData.sort((a, b) => riskOrder[a.risk] - riskOrder[b.risk]);
    
    // Set up dimensions
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = chartRef.current.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    
    // Create SVG
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // X scale
    const x = d3.scaleBand()
      .domain(chartData.map(d => d.risk))
      .range([0, width])
      .padding(0.3);
    
    // Y scale
    const y = d3.scaleLinear()
      .domain([0, d3.max(chartData, d => d.count)])
      .nice()
      .range([height, 0]);
    
    // Color scale based on risk level
    const color = d3.scaleOrdinal()
      .domain(['Low', 'Medium', 'High', 'Very High'])
      .range(['#38a169', '#dd6b20', '#e53e3e', '#1a202c']);
    
    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('fill', '#a0aec0')
      .style('font-size', '12px');
    
    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => {
        return d >= 1000000 ? `${d/1000000}M` : 
               d >= 1000 ? `${d/1000}K` : d;
      }))
      .selectAll('text')
      .attr('fill', '#a0aec0')
      .style('font-size', '12px');
    
    // Add Y axis label
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left + 15)
      .attr('x', -height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('fill', '#a0aec0')
      .style('font-size', '12px')
      .text('Number of Data Points');
    
    // Add bars
    svg.selectAll('.bar')
      .data(chartData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.risk))
      .attr('width', x.bandwidth())
      .attr('y', d => y(d.count))
      .attr('height', d => height - y(d.count))
      .attr('fill', d => color(d.risk))
      .attr('rx', 2) // Rounded corners
      .attr('opacity', 0.8);
    
    // Add labels on top of bars
    svg.selectAll('.label')
      .data(chartData)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', d => x(d.risk) + x.bandwidth() / 2)
      .attr('y', d => y(d.count) - 5)
      .attr('text-anchor', 'middle')
      .style('fill', '#e2e8f0')
      .style('font-size', '10px')
      .text(d => {
        return d.count >= 1000000 ? `${(d.count/1000000).toFixed(1)}M` : 
               d.count >= 1000 ? `${(d.count/1000).toFixed(1)}K` : d.count;
      });
      
  }, [data]);
  
  return (
    <Paper className="chart-container">
      <Typography variant="h6" className="chart-title">
        Risk Level Distribution
      </Typography>
      <Box ref={chartRef} className="chart-area" />
    </Paper>
  );
};

export default RiskDistributionChart; 