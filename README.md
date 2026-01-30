# OT Risk Measurement Simulation

A React-based Operational Technology (OT) Risk Measurement tool. It uses Monte Carlo simulations to model scenarios, analyze control effectiveness, and calculate Annual Loss Expectancy (ALE) and Loss Exceedance Curves (LEC) for industrial environments.

## Features

- **Monte Carlo Simulation**: accurate risk modeling using Beta-PERT and Poisson distributions.
- **Dynamic Visualization**: Interactive histograms and Loss Exceedance Curves (LEC).
- **Control Effectiveness**: Analyze how specific security controls reduce frequency and impact.
- **Excel Profile Import**: Upload complex risk profiles directly from Excel.
- **PDF Export**: Generate executive summary reports with charts.

## Usage

1.  **Upload Profile**: Drag and drop your Risk Assessment Profile (Excel).
2.  **Configure**: Enter assessment details (Company Name, Date).
3.  **Simulate**: converting raw data into actionable risk metrics.
4.  **Analyze**: View key statistics, Recommended Controls, and Detailed scenarios.
5.  **Export**: Download the full report as a PDF.

## Development

This project was built with:
-   React 18
-   Vite
-   Tailwind CSS
-   Plotly.js
-   TypeScript

### Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Credits

**Developed by Steven Hsu**
Contact: steven_hsu@txone.com
