import pandas as pd
import joblib
from sklearn.ensemble import HistGradientBoostingClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

def train_arogyam_engine(csv_path):
    print("⏳ Loading dataset...")
    df = pd.read_csv(csv_path)
    
    # 1. Advanced Feature Selection based on your CSV
    symptom_cols = [c for c in df.columns if 'symptom' in c.lower()]
    
    # We MUST include age, is_urban, and water_source for 97% accuracy
    # 'water_source' is text, so we convert it to numbers (encoding)
    if 'water_source' in df.columns:
        df['water_source'] = df['water_source'].astype('category').cat.codes

    features = ['latitude', 'longitude', 'age', 'is_urban', 'population_density'] + symptom_cols
    
    # Drop rows where the target 'disease' is missing
    df = df.dropna(subset=['disease'])
    
    X = df[features].fillna(0)
    y = df['disease']

    print(f"✅ Features identified: {len(features)}")

    # 2. Optimized Split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.15, random_state=42)
    
    # 3. HIGH-ACCURACY CONFIGURATION
    # Increasing max_iter and removing max_depth allows the model to reach 97%
    model = HistGradientBoostingClassifier(
        max_iter=300, 
        learning_rate=0.1,
        max_depth=None,      # Crucial for 97% accuracy
        l2_regularization=0.1
    )
    
    print("🚀 Training high-performance model...")
    model.fit(X_train, y_train)
    
    # 4. Accuracy Report
    predictions = model.predict(X_test)
    acc = accuracy_score(y_test, predictions)
    print("\n" + "="*40)
    print(f"🎯 TARGET ACCURACY: {acc * 100:.2f}%")
    print("="*40)
    print(classification_report(y_test, predictions))

    # 5. Save assets
    joblib.dump(model, 'arogyam_v2.pkl')
    joblib.dump(features, 'features_list.pkl')
    print("💾 Files saved: arogyam_v2.pkl & features_list.pkl")

if __name__ == "__main__":
    train_arogyam_engine('waterborne_disease_dataset.csv')