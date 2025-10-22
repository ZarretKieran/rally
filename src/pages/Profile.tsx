import React, { useState } from 'react';
import { User, Calendar, Settings, LogOut, Bell, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { currentUser } from '@/data/mockData';

export const Profile: React.FC = () => {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [selectedInterests, setSelectedInterests] = useState(
    currentUser.preferences?.interests || []
  );

  const allInterests = [
    'Sports', 'Movies', 'Coffee', 'Study', 'Gaming', 'Food',
    'Music', 'Art', 'Hiking', 'Photography', 'Tech', 'Reading'
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSave = () => {
    alert('Profile updated successfully!');
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
          👤
        </div>
        <h1 className="text-3xl font-bold">{currentUser.name}</h1>
        <p className="text-gray-600">{currentUser.email}</p>
      </div>

      {/* Calendar Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Calendar Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold">Google Calendar</p>
                <p className="text-sm text-gray-600">
                  {currentUser.calendarConnected ? 'Connected' : 'Not connected'}
                </p>
              </div>
            </div>
            {currentUser.calendarConnected ? (
              <Badge variant="success">Active</Badge>
            ) : (
              <Button size="sm">Connect</Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Personal Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            Personal Information
          </CardTitle>
          <CardDescription>Update your profile details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Interests */}
      <Card>
        <CardHeader>
          <CardTitle>Interests & Preferences</CardTitle>
          <CardDescription>Help us suggest better hangouts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {allInterests.map((interest) => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`p-3 rounded-lg border-2 transition-all text-sm ${
                  selectedInterests.includes(interest)
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Hangout Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Time
            </label>
            <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option>Morning</option>
              <option>Afternoon</option>
              <option selected>Evening</option>
              <option>Night</option>
              <option>Flexible</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hangout Frequency
            </label>
            <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option>Daily</option>
              <option selected>Weekly</option>
              <option>Monthly</option>
              <option>Flexible</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Group Size Preference
            </label>
            <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option>One-on-one</option>
              <option selected>Small group (2-4)</option>
              <option>Large group (5+)</option>
              <option>Flexible</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <span>Notifications</span>
            </div>
            <Badge variant="outline">Enabled</Badge>
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-gray-600" />
              <span>Privacy</span>
            </div>
          </button>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button onClick={handleSave} className="w-full" size="lg">
        Save Changes
      </Button>

      {/* Logout */}
      <Button variant="outline" className="w-full" size="lg">
        <LogOut className="w-4 h-4 mr-2" />
        Log Out
      </Button>
    </div>
  );
};
