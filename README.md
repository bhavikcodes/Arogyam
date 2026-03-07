# Arogyam 🛡️

**Hybrid Disease Surveillance & Outbreak Detection System**

Arogyam is a hybrid, geo-enabled disease surveillance platform designed to enable early detection, confirmation, and monitoring of infectious disease outbreaks at the community level. The system integrates citizen reporting, community health worker observations, and hospital-confirmed diagnoses into a unified data platform to provide real-time outbreak intelligence for government authorities.

The core objective is to shift from reactive healthcare response to **proactive outbreak prevention** through data-driven decision-making.

---

## 🎯 Problem Statement

Urban slums and densely populated regions often lack structured health monitoring systems. Many infectious disease cases go unreported until they escalate into serious outbreaks. Hospital data alone is insufficient for early detection, while community-level data without medical validation can be unreliable.

**There is a need for a system that:**
- Captures early symptom-level signals from communities
- Validates confirmed cases through hospitals
- Detects geo-based disease clusters in real time
- Provides actionable alerts to authorities

---

## 🏗️ Solution Architecture

Arogyam follows a hybrid surveillance model consisting of four primary layers:

### 1. Citizen Application Layer
Citizens play an active role in early reporting. They can:
- Register and manage profiles
- Report symptoms (suspected cases)
- View local health alerts
- Receive public health advisories
*These reports act as early warning signals.*

### 2. Community Health Worker Layer
ASHA workers, Anganwadi workers, and volunteers ensure structured ground-level validation:
- Register households
- Log suspected cases
- Monitor local health patterns

### 3. Hospital Confirmation Layer
Medical professionals validate the data to ensure credibility:
- Register patient visits
- Confirm diagnoses
- Update treatment summaries
- Convert suspected cases into confirmed cases
*(Only hospital-authorized users can mark a case as confirmed).*

### 4. Government Monitoring Dashboard
Authorities get actionable intelligence:
- View real-time geo heatmaps
- Track suspected vs. confirmed cases
- Monitor disease-wise trends
- Receive automated outbreak alerts
- Analyze cluster growth rates

---

## 🔄 Core Workflow

1. A citizen or community worker logs a **suspected case**.
2. The case is stored with **geo-location and timestamp**.
3. The AI engine continuously evaluates:
   - Number of cases within a defined radius
   - Time-window spikes
   - Disease-specific thresholds
4. **Alerts**:
   - If *suspected* threshold exceeds limit → **🟡 Yellow Alert** triggered.
   - If *confirmed* threshold exceeds limit → **🔴 Red Alert** triggered.
5. Government dashboard updates in real time.
6. Authorities initiate preventive measures.

---

## 🦠 Outbreak Detection Logic

Outbreak detection is dynamic and disease-specific. Each disease has configurable parameters:
- **Suspected case threshold**
- **Confirmed case threshold**
- **Cluster radius** (meters)
- **Time window** (hours)

The system performs geo-radius queries and time-based filtering to detect clusters automatically.

---

## ✨ Key Features

- **Role-based Authentication**: Secure access for Citizens, Community Workers, Hospitals, and Admins.
- **Geo-spatial Cluster Detection**: Powered by MongoDB 2dsphere indexing.
- **Real-time Outbreak Classification**: Green, Yellow, and Red zones.
- **Disease-specific Configuration**: Customizable thresholds for different diseases.
- **Hybrid Data Lifecycle**: Seamless transition from suspected to confirmed cases.
- **Scalable Architecture**: Built on a single unified database.
- **Privacy First**: Future-ready federated learning concept for privacy-preserving analytics.

---

## 💻 Technology Stack

**Backend**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose ORM

**Frontend**
- React.js
- Leaflet (for interactive maps)

**Security & Database**
- JWT-based secure role system
- MongoDB with GeoJSON location support

---

## 🗄️ Data Model Overview

**Core Collections:**
- `Users`
- `Cases`
- `Diseases`
- `Hospitals`

**Case Structure:**
Each case contains its type (suspected or confirmed), source (citizen/community/hospital), geo-location, disease reference, and confirmation metadata.

---

## 🚀 Future Scope

- **Federated Learning:** Decentralized hospital data training.
- **Multi-language Support:** Accessible public interfaces.
- **SMS Alert Integration:** Instant notifications for affected areas.
- **Risk Prediction:** Zone-based risk modeling.
- **Forecasting:** Real-time predictive outbreak forecasting.

---

## 🌍 Impact

Arogyam bridges the gap between community-level signals and hospital-level confirmation to create a robust, intelligent disease monitoring ecosystem. It enables:
- Early detection of infectious disease clusters
- Reduced outbreak escalation
- Data-driven public health decisions
- Transparent monitoring across stakeholders
- Improved healthcare response efficiency

---
*Built with ❤️ to safeguard communities.*
