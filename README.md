# Google Calendar Integration App

A web application that allows users to log in with Google, view their calendar events, and analyze event data through various visualizations.

## Live Demo

- Frontend: [https://whitecarrot.vercel.app](https://whitecarrot.vercel.app)
- Backend: [https://whitecarrot.onrender.com](https://whitecarrot.onrender.com)

## Features

- Google Single Sign-On (SSO) authentication
- Google Calendar integration
- Event display with date-based filtering
- Analytics Dashboard featuring:
  - Event duration bar chart
  - Event type distribution pie chart
  - Weekly event frequency bar chart
  - Long events (>2 hours) distribution pie chart
- Event list export functionality

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB

### Frontend
- React.js
- Recharts for data visualization
- Tailwind CSS for styling

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installation or MongoDB Atlas account
- Google Cloud Console account

### Google Cloud Console Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Google Calendar API
   - Google OAuth2 API
4. Configure OAuth Consent Screen:
   - Set user type as "External"
   - Add required scopes:
     - `openid`
     - `profile`
     - `email`
     - `https://www.googleapis.com/auth/calendar.readonly`
5. Create OAuth 2.0 Client ID:
   - Go to Credentials
   - Click "Create Credentials" → "OAuth Client ID"
   - Application Type: "Web Application"
   - Add authorized JavaScript origins:
     - `http://localhost:3000` (development)
     - `https://whitecarrot.vercel.app` (production)
   - Add authorized redirect URIs:
     - `http://localhost:5000/auth/google/callback` (development)
     - `https://whitecarrot.onrender.com/auth/google/callback` (production)
6. Note down the Client ID and Client Secret

### Environment Variables Setup

1. Backend (.env file in server directory):
```
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_session_secret
CLIENT_URL=http://localhost:3000
PORT=5000
```

2. Frontend (.env file in client directory):
```
REACT_APP_API_URL=http://localhost:5000
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/manicharan-12/Whitecarrot.git
cd Whitecarrot
```

2. Install backend dependencies:
```bash
cd server
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd server
node index.js
```

2. Start the frontend development server:
```bash
cd client
npm start
```

The application will be available at `http://localhost:3000`
