import pandas as pd
import numpy as np
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, roc_auc_score
from datetime import datetime
import joblib
import os
from xgboost.callback import TrainingCallback


CHECKPOINT_DIR = "checkpoints"
os.makedirs(CHECKPOINT_DIR, exist_ok=True)


df = pd.read_parquet("fire_chunks")
required_cols = ['swir_norm', 'landcover', 'fire_temp_ti4', 'fire_label','latitude','longitude']
df.dropna(subset=required_cols, inplace=True)

if 'fire_daynight' in df.columns:
    df['fire_daynight'] = df['fire_daynight'].str.upper().map({'D': 1, 'N': 0}).fillna(0).astype('int8')
    print("Encoded 'fire_daynight' column")
else:
    raise ValueError("Missing 'fire_daynight' column")


features = ['swir_norm', 'landcover', 'fire_temp_ti4', 'fire_daynight', 'latitude', 'longitude']
X = df[features]
y = df['fire_label'].astype(int)


neg, pos = np.bincount(y)
imbalance_ratio = neg / pos



X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

params = {
    'objective': 'binary:logistic',
    'eval_metric': ['auc', 'logloss'],
    'max_depth': 6,
    'learning_rate': 0.05,
    'subsample': 0.8,
    'colsample_bytree': 0.8,
    'scale_pos_weight': imbalance_ratio,
    'seed': 42,
    'tree_method': 'hist'
}

class ModelCheckpoint(TrainingCallback):
    def __init__(self, save_interval=100):
        self.save_interval = save_interval
        
    def after_iteration(self, model, epoch, evals_log):
        if (epoch + 1) % self.save_interval == 0:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            path = os.path.join(CHECKPOINT_DIR, f"model_iter_{epoch+1}_{timestamp}.json")
            model.save_model(path)
            print(f"Saved checkpoint")
        return False

def train_from_scratch(rounds=2000):
    dtrain = xgb.DMatrix(X_train, label=y_train)
    dtest = xgb.DMatrix(X_test, label=y_test)
    
   
    model = xgb.train(
        params,
        dtrain,
        num_boost_round=rounds,
        evals=[(dtrain, 'train'), (dtest, 'valid')],
        early_stopping_rounds=100,
        verbose_eval=50,
        callbacks=[ModelCheckpoint(save_interval=100)]
    )
    
    
    y_pred = model.predict(dtest)
    print("\n Classification Report:")
    print(classification_report(y_test, (y_pred > 0.5).astype(int), digits=4))
    print("ROC AUC Score:", roc_auc_score(y_test, y_pred))
    
    return model

model = train_from_scratch(rounds=2000)

timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
model.save_model(f"fire_model_final_{timestamp}.json")
joblib.dump(model, f"fire_model_final_{timestamp}.pkl")
print(f"Final model saved with timestamp: {timestamp}")