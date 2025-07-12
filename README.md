
## Fire Prediction Model

We trained an **XGBoost** classifier using:
- **ESA WorldCover 2021** Land classification  
- **SWIR (Short-Wave Infrared)** values  
- **Brightness Temperature (TI4)**  
- **Latitude & Longitude**

The model identifies regions prone to fire using 2021 data from **Uttarakhand**, giving a reliable prediction baseline.  
Performance is evaluated with precision/recall (screenshot in repo).

---
#### Model Architecture

- **Algorithm**: [XGBoost](https://xgboost.readthedocs.io/) — Gradient Boosted Decision Trees  
- **Task**:  classification   
- **Preprocessing**: Cleaned and aligned raster inputs using `rioxarray` and `xarray`  
- **Training Sample Size**: Balanced sampling of fire and non-fire zones  
- **Evaluation**: F1-Score, Classification Report (see `/results`)

---

### Fire Risk Classification Thresholds

Based on the model's prediction probability, we classify fire risk into four categories:

| Probability Range | Risk Level     | Description                                 |
|-------------------|----------------|---------------------------------------------|
| `> 0.95`          | Very High    | Immediate fire-prone area; urgent attention |
| `0.80 – 0.95`     | High         | High likelihood; active monitoring needed   |
| `0.50 – 0.80`     | Medium       | Some risk; monitor environmental triggers   |
| `< 0.50`          | Low          | Low likelihood of ignition                  |

These thresholds help in visualizing risk maps, prioritizing firefighting resources, and issuing early warnings.