# Arogyam — Major Project Upgrade Roadmap

This document outlines the planned upgrades to Arogyam for the final-year major project, building on the deployed minor-project base. The goal is to move the system from **rule-based case counting** to **statistically validated outbreak surveillance**, with measurable evidence that it works.

---

## Why Upgrade

The current system flags an outbreak by comparing a raw case count against a fixed threshold within a radius and time window. This is easy to explain but hard to defend: it can't distinguish a real cluster from ordinary background noise, it has no defense against spam or duplicate reports, and it offers no evidence — no accuracy numbers, no comparison, no validation — that it actually detects outbreaks earlier than doing nothing would.

The upgrades below are organized to fix exactly that, in order of priority.

---

## 1. Real Outbreak Detection Algorithms

Replace the fixed-threshold rule with established epidemiological surveillance methods.

| Method | Purpose | Notes |
|---|---|---|
| **Kulldorff Spatial Scan Statistic** | Detects statistically significant spatial clusters (the method SaTScan implements) | Scans variable-radius circles, computes a likelihood ratio, assigns a p-value via Monte Carlo permutation |
| **CUSUM / EWMA** | Detects a sustained shift away from a baseline case rate | Simple to implement, good first win |
| **EARS (C1, C2, C3)** | CDC's early aberration reporting algorithms | Adjusts for expected baseline before flagging a spike |
| **ST-DBSCAN** | Spatiotemporal density-based clustering | ML-flavoured alternative, straightforward with scikit-learn |
| **Effective Reproduction Number (Rt)** | Estimates transmission rate from the case time series | Turns "5 cases nearby" into "Rt = 1.6 and rising" — a genuinely actionable dashboard number |

**Architecture change:** formalize the existing `Prediction Model` folder into a standalone **Python (FastAPI) analytics microservice**, called by the Node backend. This also resolves the current imbalance where Python sits unintegrated at a small fraction of the codebase.

---

## 2. Data Quality & Anti-Spoofing Layer

Addresses the most likely panel question: *"What stops someone from submitting fake reports to trigger a false alert?"*

- **Source-weighted evidence** — citizen reports, ASHA/community worker logs, and hospital confirmations are not equally trustworthy. Weight them (e.g. citizen 0.3, community worker 0.7, hospital 1.0) and feed weighted counts into the detection statistics instead of raw counts.
- **Duplicate & spam detection** — flag repeated reports from the same household or phone number, implausible report bursts from a single device, and geographically impossible report sequences.
- **OTP verification** on citizen registration and reporting, reframed in the report as *surveillance integrity*, not just a signup nicety.

---

## 3. Validation & Results

Most student projects have no measured results section. This is what will separate a good grade from the maximum grade.

- **Historical backtesting** — replay real historical outbreak data (IDSP weekly reports, NCDC data, municipal dengue/malaria records) through the pipeline and measure: *how many days before the official outbreak declaration did Arogyam's algorithm flag it?*
- **Outbreak simulation** — build an SEIR or agent-based simulator over real ward-level geometry, inject synthetic outbreaks, and report **sensitivity, false alarm rate, and time-to-detection**.
- **Comparative evaluation** — plot ROC/AMOC curves comparing the new statistical methods against the old fixed-threshold rule, to directly demonstrate the improvement.

---

## 4. Privacy & Compliance

Replaces the vague "federated learning" future-scope item with things that can actually ship in the project timeline.

- **k-anonymity on the public heatmap** — aggregate case locations to grid cells and suppress any cell with fewer than *k* cases before public display.
- **Differential privacy noise** on the publicly visible layer; full-precision data remains restricted to authorized government users.
- **DPDP Act 2023 compliance notes** — health data qualifies as sensitive personal data under Indian law. Document consent capture, purpose limitation, retention policy, and audit logging.

---

## 5. Domain-Aware Feature Addition

Rather than adding many shallow features, one feature is prioritized for genuine field relevance:

- **Offline-first PWA for community health workers** — IndexedDB storage with background sync, since rural and slum-area connectivity is often unreliable. This demonstrates an understanding of real deployment conditions rather than assuming constant connectivity.
- **Bhashini multilingual support** — second priority, for accessibility and social-impact scoring.

Other previously-listed future-scope items (YouTube links, appointment booking, UI cloning, generic chatbot) are deprioritized as low-value relative to team effort; if a chatbot is added, it should be RAG-based over verified government health advisories with citations, not a generic wrapper.

---

## 6. Ethics Considerations

To be documented explicitly in the report, not left implicit:

- A system that marks neighborhoods red on a public map risks causing panic and stigmatizing communities — alerts should route to authorities before any public display, and public views should never expose exact case locations.
- Citizen-facing surveys collect sensitive health data from populations that may not fully understand consent implications — consent flows must be explicit and in plain language.
- The citizen-facing app must never provide diagnosis or treatment advice — only guidance that symptoms warrant medical attention, plus verified facility information.

---

## Suggested Team Split (3 members)

| Member | Owns |
|---|---|
| A | Python analytics service — scan statistic, CUSUM/EARS, Rt estimation, simulation & backtesting |
| B | Node backend — data-quality/weighting layer, privacy controls, auth hardening, service integration |
| C | Dashboard, offline-first PWA, visualization, report writing, demo |

---

## Stretch Goal

With the scan statistic implementation and backtested results in hand, there is enough original technical contribution here for a conference paper or preprint (IEEE/Springer format, or arXiv). This also gives the final report a stronger backbone than a standard project write-up.

---

## Summary of Priority Order

1. Statistical detection algorithms (replaces the core weak point)
2. Validation with measured results (this is what maximizes marks)
3. Data-quality / anti-spoofing layer (defends the obvious panel question)
4. Privacy & compliance (turns a vague future-scope line into a real, defensible section)
5. One well-executed domain feature (offline PWA) over several shallow ones
