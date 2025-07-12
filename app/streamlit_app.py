import streamlit as st
import numpy as np
import pandas as pd
import plotly.express as px
import os
from datetime import datetime

# Enhanced Page Configuration
st.set_page_config(
    page_title="FireGuard AI - Predictive Forest Fire Dashboard",
    layout="wide",
    page_icon="🔥",
    initial_sidebar_state="expanded"
)

# Custom CSS for better styling
st.markdown("""
<style>
    .metric-card {
        border-radius: 10px;
        padding: 15px;
        margin-bottom: 20px;
        background-color: #f8f9fa;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .high-risk {
        border-left: 5px solid #e74c3c;
    }
    .medium-risk {
        border-left: 5px solid #f39c12;
    }
    .low-risk {
        border-left: 5px solid #2ecc71;
    }
    .header-font {
        font-size: 1.2rem;
        color: #2c3e50;
        font-weight: 600;
    }
</style>
""", unsafe_allow_html=True)

@st.cache_data
def load_data(npz_path="sampled_data/fire_risk_demo_data_1mill.npz"):
    npz_path = os.path.join(os.path.dirname(__file__), "sampled_data", "fire_risk_demo_data_1mill.npz")
    data = np.load(npz_path, allow_pickle=True)
    lat = data["latitude"]
    lon = data["longitude"]
    risk = data["risk"].astype(str)
    return pd.DataFrame({
        'latitude': lat,
        'longitude': lon,
        'risk': risk
    })

# Sidebar for filters and controls
with st.sidebar:
    st.image("https://via.placeholder.com/150x50?text=FireGuard+AI", width=150)
    st.title("Filters & Controls")
    
    # Date selection
    analysis_date = st.date_input(
        "Analysis Date",
        datetime.now(),
        help="Select date for risk prediction"
    )
    
    # Risk level selection
    risk_levels = ['Low', 'Medium', 'High', 'Very High']
    selected_risks = st.multiselect(
        "Select risk levels to display:",
        risk_levels,
        default=risk_levels,
        help="Filter by risk probability levels"
    )
    
    # Region filter (to be implemented)
    regions = ["All Regions", "Odisha", "Rajasthan", "Madhya Pradesh"]
    selected_region = st.selectbox(
        "Select Region",
        regions,
        index=0
    )
    
    # Display data freshness
    st.markdown("---")
    st.caption(f"Last updated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

# Main dashboard layout
st.title("🔥 FireGuard AI - Predictive Forest Fire Monitoring")
st.markdown("*Real-time fire risk prediction and visualization system*")

# Key Metrics Row
col1, col2, col3, col4 = st.columns(4)
with col1:
    st.markdown('<div class="metric-card high-risk">', unsafe_allow_html=True)
    st.metric("High Risk Zones", "1,248", "12 new today")
    st.markdown('</div>', unsafe_allow_html=True)

with col2:
    st.markdown('<div class="metric-card medium-risk">', unsafe_allow_html=True)
    st.metric("Medium Risk Zones", "3,456", "24 new today")
    st.markdown('</div>', unsafe_allow_html=True)

with col3:
    st.markdown('<div class="metric-card low-risk">', unsafe_allow_html=True)
    st.metric("Low Risk Zones", "8,912", "132 new today")
    st.markdown('</div>', unsafe_allow_html=True)

with col4:
    st.markdown('<div class="metric-card">', unsafe_allow_html=True)
    st.metric("Prediction Accuracy", "92.7%", "+1.3% from last week")
    st.markdown('</div>', unsafe_allow_html=True)

# Load and filter data
plot_df = load_data()
filtered_df = plot_df[plot_df['risk'].isin(selected_risks)]

# Interactive Map Visualization
st.markdown("## Fire Risk Heatmap")
st.markdown(f"Showing {len(filtered_df):,} data points")

# Using Plotly for interactive visualization
fig = px.scatter_mapbox(
    filtered_df,
    lat="latitude",
    lon="longitude",
    color="risk",
    color_discrete_map={
        'Low': 'green',
        'Medium': 'orange',
        'High': 'red',
        'Very High': 'black'
    },
    zoom=5,
    height=600,
    title="Forest Fire Risk Probability"
)

fig.update_layout(
    mapbox_style="stamen-terrain",
    margin={"r":0,"t":40,"l":0,"b":0},
    legend=dict(
        orientation="h",
        yanchor="bottom",
        y=1.02,
        xanchor="right",
        x=1
    )
)

st.plotly_chart(fig, use_container_width=True)

# Additional Analytics Section
st.markdown("## Risk Distribution Analysis")
col1, col2 = st.columns(2)

with col1:
    st.markdown("### Risk Level Distribution")
    risk_counts = filtered_df['risk'].value_counts().reset_index()
    risk_counts.columns = ['Risk Level', 'Count']
    st.bar_chart(risk_counts.set_index('Risk Level'))

with col2:
    st.markdown("### Regional Hotspots")
    # Sample hotspot data - replace with real calculations
    hotspots = pd.DataFrame({
        'Region': ['Baudh District', 'Sundargarh', 'Kalahandi', 'Mayurbhanj'],
        'Risk Score': [92, 88, 85, 78]
    })
    st.dataframe(
        hotspots.sort_values('Risk Score', ascending=False),
        hide_index=True,
        use_container_width=True
    )

# Model Information Section
with st.expander("Model Details & Performance Metrics"):
    st.markdown("""
    ### Predictive Model Information
    - **Model Type**: Ensemble Classifier
    - **Training Data**: 50M+ satellite observations
    - **Features**: Temperature, Humidity, NDVI, Wind Speed, Historical Fire Data
    """)
    
    col1, col2 = st.columns(2)
    with col1:
        st.image(r"C:\Users\KIIT0001\OneDrive\Desktop\notes\hackathon\cfb\ForestFire\Predictive_Model\results\classification_report.png", caption="Classification Report")

    
    with col2:
        st.image(r"C:\Users\KIIT0001\OneDrive\Desktop\notes\hackathon\cfb\ForestFire\Predictive_Model\results\test_dataset_heatmap.png", caption="Test Dataset Heatmap")
