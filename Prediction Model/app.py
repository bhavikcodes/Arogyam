import streamlit as st
import pandas as pd
import folium
from streamlit_folium import st_folium
from folium.plugins import HeatMap
import joblib
import time
from db_manager import ArogyamDB

# --- 1. ROYAL WHITE & ADVANCED UI STYLING ---
st.set_page_config(page_title="Arogyam Royal Command Center", layout="wide", page_icon="🏛️")

st.markdown("""
    <style>
    /* Main Background - Royal Cream/White */
    .stApp {
        background-color: #FDFBF7;
    }
    
    /* Elegant Metric Cards */
    [data-testid="stMetric"] {
        background-color: #ffffff !important;
        border: 1px solid #EAE0D5;
        border-radius: 15px;
        padding: 25px !important;
        box-shadow: 0 10px 25px rgba(0,0,0,0.05);
    }
    
    /* Text Visibility & Typography */
    [data-testid="stMetricLabel"] { 
        color: #5E503F !important; 
        font-family: 'Helvetica Neue', sans-serif;
        font-size: 1.1rem !important; 
    }
    [data-testid="stMetricValue"] { 
        color: #1A1A1A !important; 
        font-weight: 800 !important; 
    }

    /* Royal Patient Card Styling */
    .patient-card { 
        background: #ffffff; 
        border: 1px solid #EAE0D5;
        border-radius: 12px; 
        padding: 18px; 
        margin-bottom: 15px; 
        border-left: 6px solid #D4AF37; /* Royal Gold accent */
        box-shadow: 2px 4px 12px rgba(0,0,0,0.03);
        color: #2D2D2D;
    }
    
    .status-red { color: #D62828; font-weight: bold; }
    .status-yellow { color: #B7950B; font-weight: bold; }
    .status-green { color: #1B5E20; font-weight: bold; }
    
    h1, h2, h3 {
        color: #2C3E50 !important;
        font-family: 'Georgia', serif;
    }
    </style>
""", unsafe_allow_html=True)

# --- 2. AUDIO NOTIFICATION ---
def play_notification(severity="warning"):
    freq = 880 if severity == "critical" else 440
    js_code = f"""
    <script>
    var context = new (window.AudioContext || window.webkitAudioContext)();
    var osc = context.createOscillator();
    var gain = context.createGain();
    osc.connect(gain);
    gain.connect(context.destination);
    osc.type = "sine";
    osc.frequency.value = {freq};
    gain.gain.setValueAtTime(0.05, context.currentTime);
    osc.start();
    osc.stop(context.currentTime + 0.3);
    </script>
    """
    st.components.v1.html(js_code, height=0)

# --- 3. ASSET LOADING ---
@st.cache_resource
def load_resources():
    db = ArogyamDB("mongodb+srv://bhavik:bhavik@cluster0.fljoqul.mongodb.net/?appName=Cluster0")
    try:
        model = joblib.load('arogyam_v2.pkl')
        features = joblib.load('features_list.pkl')
        return db, model, features
    except:
        return db, None, None

db, model, model_features = load_resources()

# --- 4. PERSISTENT HEADER ---
st.markdown("<h1 style='text-align: center;'>🛡️ AROGYAM SURVEILLANCE</h1>", unsafe_allow_html=True)
st.markdown(f"<p style='text-align: center; color: #5E503F;'><b>Node:</b> Cluster0 | <b>Clock:</b> {time.strftime('%Y-%m-%d %H:%M')}</p>", unsafe_allow_html=True)

m_cols = st.columns(3)
m1_slot = m_cols[0].empty()
m2_slot = m_cols[1].empty()
m3_slot = m_cols[2].empty()

st.markdown("---")
col_map, col_records = st.columns([2, 1])
map_container = col_map.empty()
records_container = col_records.empty()

# --- 5. LOGIC & HEATMAP INTEGRATION ---
@st.fragment(run_every=20)
def sync_dashboard():
    df = db.get_dataframe(model_features)
    
    if not df.empty:
        # Disease Prediction
        if model:
            X = df.reindex(columns=model_features, fill_value=0)
            df['prediction'] = model.predict(X)
        
        # Outbreak Analysis
        df['lat_r'] = df['latitude'].round(3)
        df['lon_r'] = df['longitude'].round(3)
        clusters = df.groupby(['lat_r', 'lon_r']).size().reset_index(name='count')
        critical_zones = len(clusters[clusters['count'] >= 5])

        # Notifications
        if not clusters.empty and clusters['count'].max() >= 5:
            play_notification("critical")
            st.toast("🚨 ALERT: High-density outbreak detected!", icon="🔥")

        # Metrics
        m1_slot.metric("Live Case Reports", len(df))
        m2_slot.metric("🔴 Critical Zones", critical_zones)
        m3_slot.metric("Security Level", "Stable" if critical_zones == 0 else "Elevated")

        # --- ADVANCED HEATMAP & MARKER LOGIC ---
        with map_container.container():
            st.subheader("📍 Geospatial Heatmap & Outbreaks")
            # Light-themed map tiles for Royal White look
            m = folium.Map(location=[df['latitude'].mean(), df['longitude'].mean()], 
                           zoom_start=12, tiles="CartoDB positron")
            
            # Heatmap Layer (Visual Density)
            heat_data = [[row['latitude'], row['longitude']] for index, row in df.iterrows()]
            HeatMap(heat_data, radius=15, blur=10, gradient={0.4: 'blue', 0.65: 'lime', 1: 'red'}).add_to(m)
            
            # Point Logic: Red (5+), Yellow (2+), Green (Others)
            for _, c in clusters.iterrows():
                if c['count'] >= 5:
                    color = "#D62828" # Red
                elif c['count'] >= 2:
                    color = "#F1C40F" # Yellow
                else:
                    color = "#27AE60" # Green
                
                folium.CircleMarker(
                    location=[c['lat_r'], c['lon_r']],
                    radius=min(c['count'] * 6, 20),
                    color=color, fill=True, fill_opacity=0.8,
                    popup=f"Outbreak Size: {c['count']}"
                ).add_to(m)
            
            st_folium(m, width="100%", height=500, key="royal_map")

        # --- RECORDS SECTION ---
        with records_container.container():
            st.subheader("📑 Active Records")
            rec_box = st.container(height=500)
            for i, row in df.iterrows():
                # Styling status based on prediction
                is_disease = row['prediction'] != 'No_Disease'
                status_class = "status-red" if is_disease else "status-green"
                
                rec_box.markdown(f"""
                <div class="patient-card">
                    <b>CASE-{i+100}</b> | <small>{row['latitude']:.2f}, {row['longitude']:.2f}</small><br>
                    Prediction: <span class="{status_class}">{row['prediction']}</span><br>
                    <small style="color:#7F8C8D;">Status Verified by Node-0</small>
                </div>
                """, unsafe_allow_html=True)
    else:
        st.info("No active surveillance data found.")

sync_dashboard()