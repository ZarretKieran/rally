export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  calendarConnected: boolean;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  interests: string[];
  preferredActivities: string[];
  availabilityPreference: 'morning' | 'afternoon' | 'evening' | 'night' | 'flexible';
  hangoutFrequency: 'daily' | 'weekly' | 'monthly' | 'flexible';
  groupSize: 'one-on-one' | 'small-group' | 'large-group' | 'flexible';
}

export interface Friend extends User {
  relationshipScore: number;
  lastHangout?: Date;
  mutualFreeSlots?: TimeSlot[];
}

export interface TimeSlot {
  start: Date;
  end: Date;
  date: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
}

export interface Hangout {
  id: string;
  title: string;
  participants: Friend[];
  suggestedTime?: TimeSlot;
  confirmedTime?: TimeSlot;
  activity?: string;
  location?: string;
  status: 'suggested' | 'pending' | 'confirmed' | 'completed' | 'cancelled';
  type: 'ai-suggested' | 'manual' | 'asap' | 'open-hours';
  createdBy: string;
  createdAt: Date;
  description?: string;
}

export interface OpenHours {
  id: string;
  userId: string;
  userName: string;
  timeSlot: TimeSlot;
  activity: string;
  location: string;
  description?: string;
  interestedFriends: string[];
}

export interface ASAPRequest {
  id: string;
  userId: string;
  userName: string;
  activity: string;
  duration: number; // in minutes
  location?: string;
  description?: string;
  sentTo: string[];
  responses: {
    userId: string;
    status: 'interested' | 'declined' | 'pending';
  }[];
  createdAt: Date;
}
