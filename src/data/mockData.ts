import { Friend, Hangout, CalendarEvent, OpenHours, ASAPRequest, User } from '@/types';
import { addDays, addHours, setHours, setMinutes } from 'date-fns';

const today = new Date();

export const currentUser: User = {
  id: 'user-1',
  name: 'You',
  email: 'you@college.edu',
  calendarConnected: true,
  preferences: {
    interests: ['Sports', 'Movies', 'Coffee', 'Study'],
    preferredActivities: ['Grab food', 'Watch movie', 'Study together', 'Play basketball'],
    availabilityPreference: 'evening',
    hangoutFrequency: 'weekly',
    groupSize: 'small-group',
  },
};

export const mockFriends: Friend[] = [
  {
    id: 'friend-1',
    name: 'Sarah Chen',
    email: 'sarah@college.edu',
    avatar: '👩',
    calendarConnected: true,
    relationshipScore: 85,
    lastHangout: addDays(today, -5),
    preferences: {
      interests: ['Coffee', 'Study', 'Art', 'Music'],
      preferredActivities: ['Coffee chat', 'Study together', 'Museum visit'],
      availabilityPreference: 'afternoon',
      hangoutFrequency: 'weekly',
      groupSize: 'one-on-one',
    },
  },
  {
    id: 'friend-2',
    name: 'Marcus Johnson',
    email: 'marcus@college.edu',
    avatar: '👨',
    calendarConnected: true,
    relationshipScore: 92,
    lastHangout: addDays(today, -2),
    preferences: {
      interests: ['Sports', 'Gaming', 'Food', 'Movies'],
      preferredActivities: ['Play basketball', 'Grab dinner', 'Watch game'],
      availabilityPreference: 'evening',
      hangoutFrequency: 'weekly',
      groupSize: 'small-group',
    },
  },
  {
    id: 'friend-3',
    name: 'Emma Rodriguez',
    email: 'emma@college.edu',
    avatar: '👩‍🦱',
    calendarConnected: true,
    relationshipScore: 78,
    lastHangout: addDays(today, -12),
    preferences: {
      interests: ['Food', 'Hiking', 'Photography', 'Coffee'],
      preferredActivities: ['Brunch', 'Nature walk', 'Coffee chat'],
      availabilityPreference: 'morning',
      hangoutFrequency: 'monthly',
      groupSize: 'flexible',
    },
  },
  {
    id: 'friend-4',
    name: 'Alex Kim',
    email: 'alex@college.edu',
    avatar: '🧑',
    calendarConnected: true,
    relationshipScore: 88,
    lastHangout: addDays(today, -7),
    preferences: {
      interests: ['Study', 'Gaming', 'Tech', 'Food'],
      preferredActivities: ['Study session', 'Gaming night', 'Grab food'],
      availabilityPreference: 'night',
      hangoutFrequency: 'weekly',
      groupSize: 'small-group',
    },
  },
  {
    id: 'friend-5',
    name: 'Jordan Lee',
    email: 'jordan@college.edu',
    avatar: '👤',
    calendarConnected: false,
    relationshipScore: 65,
    lastHangout: addDays(today, -30),
    preferences: {
      interests: ['Music', 'Art', 'Coffee', 'Movies'],
      preferredActivities: ['Concert', 'Art gallery', 'Movie night'],
      availabilityPreference: 'flexible',
      hangoutFrequency: 'monthly',
      groupSize: 'flexible',
    },
  },
];

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: 'event-1',
    title: 'CS 101 Lecture',
    start: setMinutes(setHours(today, 10), 0),
    end: setMinutes(setHours(today, 11), 30),
  },
  {
    id: 'event-2',
    title: 'Study Group',
    start: setMinutes(setHours(today, 14), 0),
    end: setMinutes(setHours(today, 16), 0),
  },
  {
    id: 'event-3',
    title: 'Basketball Practice',
    start: setMinutes(setHours(addDays(today, 1), 17), 0),
    end: setMinutes(setHours(addDays(today, 1), 19), 0),
  },
  {
    id: 'event-4',
    title: 'Math Tutorial',
    start: setMinutes(setHours(addDays(today, 2), 13), 0),
    end: setMinutes(setHours(addDays(today, 2), 14), 30),
  },
];

export const mockHangouts: Hangout[] = [
  {
    id: 'hangout-1',
    title: 'Coffee with Sarah',
    participants: [mockFriends[0]],
    confirmedTime: {
      start: setMinutes(setHours(addDays(today, 1), 15), 0),
      end: setMinutes(setHours(addDays(today, 1), 16), 0),
      date: addDays(today, 1).toISOString(),
    },
    activity: 'Coffee chat',
    location: 'Campus Café',
    status: 'confirmed',
    type: 'ai-suggested',
    createdBy: 'user-1',
    createdAt: addDays(today, -1),
  },
  {
    id: 'hangout-2',
    title: 'Basketball with Marcus & Alex',
    participants: [mockFriends[1], mockFriends[3]],
    suggestedTime: {
      start: setMinutes(setHours(addDays(today, 3), 18), 0),
      end: setMinutes(setHours(addDays(today, 3), 20), 0),
      date: addDays(today, 3).toISOString(),
    },
    activity: 'Play basketball',
    location: 'Recreation Center',
    status: 'pending',
    type: 'ai-suggested',
    createdBy: 'user-1',
    createdAt: today,
  },
  {
    id: 'hangout-3',
    title: 'Study Session',
    participants: [mockFriends[0], mockFriends[3]],
    suggestedTime: {
      start: setMinutes(setHours(addDays(today, 2), 19), 0),
      end: setMinutes(setHours(addDays(today, 2), 21), 0),
      date: addDays(today, 2).toISOString(),
    },
    activity: 'Study together',
    location: 'Library - 3rd Floor',
    status: 'suggested',
    type: 'ai-suggested',
    createdBy: 'user-1',
    createdAt: today,
  },
];

export const mockOpenHours: OpenHours[] = [
  {
    id: 'open-1',
    userId: 'friend-2',
    userName: 'Marcus Johnson',
    timeSlot: {
      start: setMinutes(setHours(today, 20), 0),
      end: setMinutes(setHours(today, 22), 0),
      date: today.toISOString(),
    },
    activity: 'Gaming night',
    location: 'My dorm - Room 304',
    description: 'Playing some FIFA and chill. Snacks provided!',
    interestedFriends: ['user-1', 'friend-4'],
  },
];

export const mockASAPRequests: ASAPRequest[] = [
  {
    id: 'asap-1',
    userId: 'friend-1',
    userName: 'Sarah Chen',
    activity: 'Quick coffee break',
    duration: 30,
    location: 'Campus Café',
    description: 'Need a study break! Anyone free?',
    sentTo: ['user-1', 'friend-3', 'friend-4'],
    responses: [
      { userId: 'user-1', status: 'pending' },
      { userId: 'friend-3', status: 'declined' },
      { userId: 'friend-4', status: 'interested' },
    ],
    createdAt: addHours(today, -1),
  },
];
