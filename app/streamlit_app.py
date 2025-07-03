import streamlit as st
import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt


st.set_page_config(page_title="Fire Risk Map", layout="wide")


st.title("Fire Risk Visualization")
st.markdown("This map shows the Sampled  predicted fire risk categorized by probability.")


@st.cache_data
def load_data(npz_path="sampled_data/fire_risk_demo_data_1mill.npz"):
    data = np.load(npz_path, allow_pickle=True)
    lat = data["latitude"]
    lon = data["longitude"]
    risk = data["risk"].astype(str)
    return pd.DataFrame({
        'latitude': lat,
        'longitude': lon,
        'risk': risk
    })


plot_df = load_data()


risk_levels = plot_df["risk"].unique().tolist()
selected_risks = st.multiselect("Select risk levels to display:", risk_levels, default=risk_levels)

filtered_df = plot_df[plot_df['risk'].isin(selected_risks)]


fig, ax = plt.subplots(figsize=(12, 8))
sns.scatterplot(
    data=filtered_df,
    x="longitude", y="latitude",
    hue="risk",
    palette={'Low': 'green', 'Medium': 'orange', 'High': 'red', 'Very High': 'black'},
    s=5, alpha=0.6, linewidth=0, ax=ax
)

ax.set_title("Fire Risk Categorized by Probability")
ax.set_xlabel("Longitude")
ax.set_ylabel("Latitude")
ax.grid(True)
ax.legend(title="Risk Level", loc='upper right')

st.pyplot(fig)
