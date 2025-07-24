# EMWare.AI

## 🚀 Project Overview
EMWare.AI is an AI-powered travel itinerary planner. Users can log in, enter their travel preferences, and instantly receive a personalized trip plan with hotel and activity recommendations, complete with real images and details. The app uses Google Gemini (Generative AI) for itinerary generation and Unsplash for fetching real-world images.

---

## ✨ Features
- **Auth0 Authentication**: Secure login and logout for users
- **Smart Form**: Google Places Autocomplete for destination input
- **AI-Powered Itinerary**: Uses Gemini AI to generate custom travel plans
- **Real Images**: Fetches hotel and place images from Unsplash
- **Beautiful Animations**: Vanta.js and GSAP for engaging UI
- **Responsive Design**: Works on desktop and mobile

---

## 🛠️ Tech Stack
- **Frontend**: React, React Router
- **Authentication**: Auth0
- **AI Integration**: Google Gemini (via @google/generative-ai)
- **Images**: Unsplash API
- **Styling**: CSS, Vanta.js, GSAP
- **Build Tool**: Vite

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/EMWare.Ai.git
cd EMWare.Ai/EMWare.Ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root of `EMWare.Ai/` and add:
```env
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_GEMINI_API_KEY=your-gemini-api-key
VITE_UNSPLASH_ACCESS_KEY=your-unsplash-access-key
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```
> **Note:** Get these keys from [Auth0](https://auth0.com/), [Google Gemini](https://aistudio.google.com/), [Unsplash](https://unsplash.com/developers), and [Google Cloud Console](https://console.cloud.google.com/).

### 4. Start the App
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📝 Usage
1. **Login** with your Auth0 account.
2. **Enter your travel preferences** (destination, days, budget, travel group).
3. **Generate Trip** to get a custom itinerary with hotels and activities.
4. **View trip details** and images, or cancel and plan again!

---

## 📁 Project Structure
```
EMWare.Ai/
  ├── src/
  │   ├── Components/
  │   │   ├── Form/         # Trip planning form
  │   │   ├── Hero/         # Landing page
  │   │   ├── Navigation/   # Navbar
  │   │   ├── Ratings/      # User feedback
  │   │   └── Trip_details/ # Trip details page
  │   ├── utils/            # API integrations (Gemini, Unsplash)
  │   ├── App.jsx           # Main app component
  │   └── main.jsx          # Entry point
  ├── public/               # Static assets
  ├── package.json          # Dependencies
  └── README.md             # This file
```

---

## 🌐 Environment Variables Explained
| Variable                  | Purpose                                  |
|-------------------------- |------------------------------------------|
| VITE_AUTH0_DOMAIN         | Auth0 domain for authentication          |
| VITE_AUTH0_CLIENT_ID      | Auth0 client ID                          |
| VITE_GEMINI_API_KEY       | Google Gemini API key                    |
| VITE_UNSPLASH_ACCESS_KEY  | Unsplash API key for images              |
| VITE_GOOGLE_MAPS_API_KEY  | Google Maps API key for autocomplete     |

---

## 🤝 Contributing
1. Fork this repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License
This project is licensed under the MIT License.
