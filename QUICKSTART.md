# Rally - Quick Start Guide 🎉

## Your App is Running! 🚀

**Access Rally at:** `http://localhost:5174`

## What You Can Do Right Now

### 1. **Explore the Dashboard**
- View upcoming hangouts
- See pending ASAP requests from friends
- Check friends who need attention
- Quick access to all features

### 2. **Try the AI Advisor**
- Click "AI Advisor" button
- Select one or more friends
- Click "Generate AI Suggestions"
- See 3 smart hangout suggestions with confidence scores
- Confirm your favorite option

### 3. **Send an ASAP Request**
- Click "Who's Free?" button
- Enter what you want to do
- Select friends to notify
- Send instant hangout request

### 4. **Create Open Hours**
- Go to Spontaneous tab
- Switch to "Open Hours"
- Set your availability window
- Let friends know they can drop by

### 5. **Manage Friends**
- View all 5 mock friends
- See relationship scores
- Check last hangout dates
- Invite new friends

### 6. **Browse Hangouts**
- View upcoming, past, or all hangouts
- See 3 sample hangouts in different states
- Accept, modify, or decline suggestions

## Navigation

Use the bottom navigation bar:
- **Home** 🏠 - Dashboard
- **Friends** 👥 - Friend management
- **Hangouts** 📅 - All hangouts
- **Spontaneous** ⚡ - ASAP & Open Hours
- **Profile** 👤 - Settings & preferences

## Mock Data Overview

The app comes pre-loaded with:
- **5 Friends** with different interests and availability
- **3 Hangouts** in various states (confirmed, pending, suggested)
- **1 ASAP Request** from Sarah Chen
- **1 Open Hours** session from Marcus Johnson
- **4 Calendar Events** showing your schedule

## Key Features to Test

✅ **AI-Powered Suggestions** - Smart hangout planning based on preferences  
✅ **Calendar Integration UI** - Visual calendar connection (mock)  
✅ **Relationship Tracking** - See which friends you haven't seen lately  
✅ **Spontaneous Hangouts** - ASAP requests and Open Hours  
✅ **Friend Management** - Search, invite, and manage connections  
✅ **Multiple Hangout Modes** - AI Advisor vs Manual planning  

## Development Commands

```bash
# Start dev server (already running)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Tech Stack

- React 18 + TypeScript
- Vite (fast build tool)
- TailwindCSS (styling)
- React Router (navigation)
- Lucide Icons
- date-fns (date formatting)

## File Structure

```
src/
├── components/
│   ├── Layout.tsx          # Main layout with navigation
│   └── ui/                 # Reusable UI components
├── pages/
│   ├── Dashboard.tsx       # Home page
│   ├── Friends.tsx         # Friend management
│   ├── Hangouts.tsx        # Hangout list
│   ├── CreateHangout.tsx   # AI Advisor & Manual mode
│   ├── Spontaneous.tsx     # ASAP & Open Hours
│   ├── Profile.tsx         # User settings
│   └── Onboarding.tsx      # First-time setup
├── data/
│   └── mockData.ts         # All mock data
├── types/
│   └── index.ts            # TypeScript types
└── lib/
    └── utils.ts            # Utility functions
```

## Next Steps

1. **Explore the UI** - Click around and test all features
2. **Customize Mock Data** - Edit `src/data/mockData.ts` to add more friends/hangouts
3. **Modify Styles** - Adjust colors in `tailwind.config.js` and `src/index.css`
4. **Add Real Backend** - Integrate with your API when ready
5. **Calendar API** - Connect real Google Calendar API
6. **Deploy** - Build and deploy to Vercel, Netlify, or your preferred host

## Troubleshooting

**Port already in use?**
- The app will automatically use the next available port (5174, 5175, etc.)
- Check terminal output for the actual port

**Styling issues?**
- Make sure TailwindCSS is processing correctly
- Check browser console for errors

**Build errors?**
- Run `npm install` again
- Clear node_modules and reinstall if needed

## Support

For questions or issues:
1. Check the `FEATURES.md` file for detailed feature documentation
2. Review the `README.md` for project overview
3. Inspect the code - it's well-commented!

---

**Happy Rallying! 🎊**

Let's make hangouts happen effortlessly!
