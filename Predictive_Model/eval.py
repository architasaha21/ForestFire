import pandas as pd
import numpy as np
import xgboost as xgb
from sklearn.metrics import classification_report, roc_auc_score
import sys

MODEL_PATH = "trained_model/finalv1.json"  
DATA_PATH = "dataset/fire_chunks" 



df = pd.read_parquet(DATA_PATH, columns=[
    'swir_norm', 'landcover', 'fire_temp_ti4',
    'fire_label', 'latitude', 'longitude', 'fire_daynight'
])
df.dropna(inplace=True)


df['fire_daynight'] = df['fire_daynight'].str.upper().map({'D': 1, 'N': 0}).fillna(0).astype('int8')

for col in ['swir_norm', 'fire_temp_ti4', 'latitude', 'longitude']:
    df[col] = pd.to_numeric(df[col], downcast='float')
df['landcover'] = pd.to_numeric(df['landcover'], downcast='integer')
df['fire_label'] = df['fire_label'].astype('int8')


features = ['swir_norm', 'landcover', 'fire_temp_ti4', 'fire_daynight', 'latitude', 'longitude']
X = df[features]
y = df['fire_label']
del df

from sklearn.model_selection import train_test_split
_, X_test, _, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
dtest = xgb.DMatrix(X_test, label=y_test)


model = xgb.Booster()
model.load_model(MODEL_PATH)


print("🔍 Making predictions...")
y_pred = model.predict(dtest)
y_pred_class = (y_pred > 0.5).astype(int)

print("\n📊 Classification Report:")
print(classification_report(y_test, y_pred_class, digits=4))

print("🎯 ROC AUC Score:", roc_auc_score(y_test, y_pred))
