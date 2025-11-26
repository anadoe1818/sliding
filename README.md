# Ana Dashboard - Conversation Flow

A React dashboard for visualizing conversation flow metrics and user analytics.

## Features

- **Conversation Flow Schema**: Visual representation of the conversation flow with boxes showing different stages
- **Funnel Chart**: Interactive funnel visualization showing user counts at each step
- **Step Metrics**: Detailed metrics for each step including:
  - Entered Users
  - Users Left (with expandable breakdown: drop, back to main menu, transfer)
  - Users Next Level
- **Detail Boxes**: Five detailed information boxes:
  - Errors Details
  - Transfer Details
  - Drop Details
  - Back to Main Menu Details
  - After Completion Behaviour

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
  ├── components/
  │   ├── ConversationFlow.jsx    # Flow diagram component
  │   ├── FunnelChart.jsx         # Funnel visualization
  │   ├── StepMetrics.jsx         # Metrics with expandable details
  │   └── DetailBoxes.jsx         # Bottom detail boxes
  ├── App.jsx                     # Main application component
  ├── main.jsx                    # Entry point
  └── index.css                   # Global styles
```

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- Recharts (for funnel visualization)

## Customization

The dashboard uses sample data defined in `App.jsx`. To connect to a real API:

1. Replace the sample data in `App.jsx` with API calls
2. Update the data structure to match your API response
3. Add loading states and error handling as needed

