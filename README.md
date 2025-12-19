# 🌍 EMWare.AI - AI-Powered Travel Planner

**Your Personal AI Travel Concierge**

[Live Demo](https://em-ware-ai-ia16.vercel.app)

---

## 📖 About

EMWare.AI is an intelligent travel planning platform that uses AI to create personalized travel itineraries in seconds. Tell us where you want to go, your budget, and preferences - our AI crafts a complete trip plan with hotel recommendations, daily activities, and stunning visuals.

## ✨ Features

- 🤖 **AI-Powered Planning** - Google Gemini generates custom itineraries
- 🔐 **Secure Authentication** - Auth0 integration
- 🗺️ **Smart Search** - Google Places Autocomplete
- 🏨 **Hotel Recommendations** - Curated suggestions with ratings and prices
- 📸 **Real Images** - Pexels API integration
- 📅 **Flexible Planning** - 1-30 day trips with custom budgets
- 💫 **Beautiful UI** - Modern dark theme with animations
- 📱 **Fully Responsive** - Works on all devices

## 🛠️ Tech Stack

- React 18.3 + Vite 6.3
- Google Gemini AI
- Auth0 Authentication
- Pexels API
- Google Maps API
- GSAP Animations

## 🚀 Setup

1. **Clone and install**
   ```bash
   git clone https://github.com/your-username/EMWare.AI.git
   cd EMWare.AI
   npm install
   ```

2. **Create `.env` file**
   ```env
   VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
   VITE_AUTH0_CLIENT_ID=your-auth0-client-id
   VITE_GEMINI_API_KEY=your-gemini-api-key
   VITE_PEXELS_API_KEY=your-pexels-api-key
   VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
   ```

3. **Run**
   ```bash
   npm run dev
   ```

## � Usagen

1. Sign in with Auth0
2. Enter destination, dates, budget, and travel companions
3. Generate your personalized itinerary
4. View hotels, activities, and images
5. Modify or cancel anytime

## 🚢 Deployment

```bash
npm run build
```

Deploy to Vercel, Netlify, or any static hosting service.

---

