# Rally MVP - Feature Overview

## 🎯 Core Features Implemented

### 1. **Onboarding Flow**
- Welcome screen with Rally branding
- Name collection
- Interest selection (12+ categories)
- Google Calendar integration UI
- Progress indicator

### 2. **Dashboard (Home)**
- Hero section with quick actions
- AI Advisor access
- ASAP "Who's Free?" requests
- Open Hours broadcasting
- Pending spontaneous hangout requests
- Upcoming hangouts display
- Friends needing attention (relationship tracking)
- Quick stats (friends count, upcoming hangouts, avg relationship score)

### 3. **Friends Management**
- Friend list with avatars and details
- Search functionality
- Relationship scores
- Last hangout tracking
- Calendar connection status
- Interest tags
- Quick "Plan Hangout" action
- Invite new friends via email

### 4. **Hangout Creation**
Two modes:
- **AI Advisor Mode**: 
  - Select friends
  - AI generates 3 suggestions based on:
    - Mutual calendar availability
    - Shared interests
    - Preferred times
    - Activity preferences
  - Confidence scores for each suggestion
  - One-click confirmation

- **Manual Mode**:
  - Select friends
  - Specify activity, date/time, duration, location
  - Manual calendar checking

### 5. **Hangouts List**
- View all hangouts (upcoming, past, all)
- Filter by status
- Hangout details: participants, time, location, activity
- Status badges (confirmed, pending, suggested, completed, cancelled)
- Action buttons based on status
- Participant avatars

### 6. **Spontaneous Features**

#### ASAP: Who's Free?
- Send instant hangout requests
- Specify activity, duration, location
- Select specific friends to notify
- View active requests from friends
- Quick response options (I'm in / Pass)

#### Open Hours
- Broadcast availability for drop-in hangouts
- Set time window
- Specify activity and location
- See friends' open hours
- Express interest in joining

### 7. **Profile**
- Personal information editing
- Calendar connection status
- Interest management (12+ categories)
- Hangout preferences:
  - Preferred time (morning/afternoon/evening/night)
  - Frequency (daily/weekly/monthly)
  - Group size preference
- Settings access
- Notification controls
- Logout option

## 🎨 Design Features

### Modern UI/UX
- **Gradient color scheme**: Purple to pink branding
- **Responsive design**: Mobile-first approach
- **Bottom navigation**: Easy thumb access on mobile
- **Card-based layout**: Clean, organized content
- **Status badges**: Color-coded for quick recognition
- **Avatar system**: Emoji-based for demo (easily replaceable)

### Visual Elements
- Lucide icons throughout
- Smooth transitions and hover effects
- Loading states and empty states
- Progress indicators
- Toast notifications (simulated with alerts)

## 📊 Mock Data Included

### Users & Friends
- 5 mock friends with varying:
  - Relationship scores (65-92)
  - Last hangout dates
  - Calendar connection status
  - Interests and preferences
  - Availability preferences

### Hangouts
- 3 sample hangouts in different states:
  - Confirmed coffee chat
  - Pending basketball game
  - Suggested study session

### Calendar Events
- 4 mock calendar events showing busy times

### Spontaneous Activities
- 1 active ASAP request
- 1 active Open Hours session

## 🔧 Technical Stack

- **React 18** with TypeScript
- **Vite** for fast development
- **TailwindCSS** for styling
- **React Router** for navigation
- **Lucide React** for icons
- **date-fns** for date formatting
- **Custom UI components** (Button, Card, Input, Badge)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app will be available at `http://localhost:5173`

## 📱 Navigation Structure

```
/onboarding - First-time user setup
/ - Dashboard (home)
/friends - Friend management
/hangouts - All hangouts list
/hangouts/new - Create new hangout
/spontaneous - ASAP & Open Hours
/profile - User profile & settings
```

## 🎯 Key User Flows

### 1. Plan a Hangout (AI Mode)
1. Click "AI Advisor" from dashboard
2. Select friends
3. Click "Generate AI Suggestions"
4. Review 3 AI-generated options
5. Confirm preferred option
6. Invites sent automatically

### 2. Send ASAP Request
1. Navigate to Spontaneous tab
2. Select "ASAP: Who's Free?"
3. Enter activity, duration, location
4. Select friends to notify
5. Send request
6. Friends receive instant notification

### 3. Create Open Hours
1. Navigate to Spontaneous tab
2. Select "Open Hours"
3. Enter activity, time window, location
4. Broadcast to all friends
5. Friends can express interest

### 4. Manage Friends
1. Go to Friends tab
2. Search or browse friends
3. View relationship scores and last hangout
4. Click "Plan Hangout" for quick scheduling
5. Invite new friends via email

## 💡 Future Enhancements (Not in MVP)

- Real Google Calendar API integration
- Push notifications
- Real-time updates with WebSockets
- Chat/messaging between friends
- Photo sharing from hangouts
- Sponsored hangouts from local businesses
- AI matching with new users
- Advanced analytics and insights
- Export to other calendar apps
- Group chat for hangouts
- Dating feature
- Location-based friend discovery

## 🎨 Color Palette

- **Primary Purple**: `#9333EA` (purple-600)
- **Primary Pink**: `#EC4899` (pink-500)
- **Success Green**: `#10B981` (green-500)
- **Warning Yellow**: `#F59E0B` (yellow-500)
- **Info Blue**: `#3B82F6` (blue-500)
- **Background**: Gradient from purple-50 via blue-50 to pink-50

## 📝 Notes

- All backend functionality is mocked with local data
- Calendar integration shows UI only (no real API calls)
- Notifications are simulated with browser alerts
- Authentication/authorization not implemented (demo mode)
- Data persistence uses localStorage for onboarding status only
- All times use browser's local timezone
