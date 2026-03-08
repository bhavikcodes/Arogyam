from pymongo import MongoClient
import certifi
import pandas as pd
from datetime import datetime
from bson import ObjectId

class ArogyamDB:
    def __init__(self, uri):
        self.client = MongoClient(uri, tlsCAFile=certifi.where())
        # Updated to target your 'test' database
        self.db = self.client["test"] 
        self.cases_col = self.db["cases"]
        self.users_col = self.db["users"]
        self.symptoms_col = self.db["symptoms"]

    def get_dataframe(self, model_features):
        # 1. Map Symptom IDs to Names for feature matching
        symptom_map = {str(s['_id']): s['name'] for s in self.symptoms_col.find()}
        
        # 2. Fetch only active cases with location data
        cases = list(self.cases_col.find({"location": {"$exists": True}}))
        
        if not cases: 
            return pd.DataFrame()

        flattened_data = []
        for case in cases:
            # Extract coordinates from the GeoJSON Point
            coords = case.get("location", {}).get("coordinates", [0, 0])
            
            # 3. Link 'cases' to 'users' via patientId
            p_id = case.get("patientId")
            patient = self.users_col.find_one({"_id": p_id})
            
            # High-Accuracy Model Features (Defaults if missing)
            age, is_urban, pop_density = 30, 0, 500
            
            if patient:
                if "dateOfBirth" in patient:
                    dob = patient["dateOfBirth"]
                    # Handle string-based dates from frontend
                    if isinstance(dob, str):
                        dob = datetime.fromisoformat(dob.replace("Z", ""))
                    age = (datetime.now() - dob).days // 365
                
                is_urban = 1 if patient.get("is_urban") else 0
                pop_density = patient.get("population_density", 500)

            row = {
                "latitude": coords[1], 
                "longitude": coords[0], 
                "age": age,
                "is_urban": is_urban,
                "population_density": pop_density
            }

            # 4. Binary encoding for symptoms
            case_sids = [str(sid) for sid in case.get("symptoms", [])]
            active_names = [symptom_map.get(sid, "").lower() for sid in case_sids]

            for feat in model_features:
                if feat.startswith("symptom_"):
                    clean_name = feat.replace("symptom_", "").replace("_", " ").lower()
                    row[feat] = 1 if any(clean_name in n for n in active_names) else 0
            
            flattened_data.append(row)
            
        return pd.DataFrame(flattened_data)