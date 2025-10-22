import React, { useState } from 'react';
import { Zap, Clock, Users, MapPin, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { mockFriends, mockOpenHours, mockASAPRequests } from '@/data/mockData';
import { formatDistanceToNow, format } from 'date-fns';

export const Spontaneous: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'asap' | 'open-hours'>('asap');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [asapActivity, setAsapActivity] = useState('');
  const [asapDuration, setAsapDuration] = useState('60');
  const [asapLocation, setAsapLocation] = useState('');
  const [openHoursActivity, setOpenHoursActivity] = useState('');
  const [openHoursLocation, setOpenHoursLocation] = useState('');
  const [openHoursDescription, setOpenHoursDescription] = useState('');

  const toggleFriend = (friendId: string) => {
    setSelectedFriends(prev =>
      prev.includes(friendId)
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    );
  };

  const sendASAPRequest = () => {
    alert(`ASAP request sent to ${selectedFriends.length} friend(s)!`);
    setSelectedFriends([]);
    setAsapActivity('');
    setAsapDuration('60');
    setAsapLocation('');
  };

  const createOpenHours = () => {
    alert('Open Hours created! Your friends will be notified.');
    setOpenHoursActivity('');
    setOpenHoursLocation('');
    setOpenHoursDescription('');
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Spontaneous Hangouts</h1>
        <p className="text-gray-600">Quick ways to connect with friends right now</p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setActiveTab('asap')}
          className={`p-4 rounded-xl border-2 transition-all ${
            activeTab === 'asap'
              ? 'border-yellow-500 bg-yellow-50'
              : 'border-gray-200 hover:border-yellow-300'
          }`}
        >
          <Zap className={`w-6 h-6 mx-auto mb-2 ${activeTab === 'asap' ? 'text-yellow-500' : 'text-gray-400'}`} />
          <h3 className="font-semibold">ASAP: Who's Free?</h3>
          <p className="text-xs text-gray-600 mt-1">Invite friends to join you now</p>
        </button>
        <button
          onClick={() => setActiveTab('open-hours')}
          className={`p-4 rounded-xl border-2 transition-all ${
            activeTab === 'open-hours'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <Clock className={`w-6 h-6 mx-auto mb-2 ${activeTab === 'open-hours' ? 'text-blue-500' : 'text-gray-400'}`} />
          <h3 className="font-semibold">Open Hours</h3>
          <p className="text-xs text-gray-600 mt-1">Broadcast your availability</p>
        </button>
      </div>

      {/* ASAP Tab */}
      {activeTab === 'asap' && (
        <div className="space-y-6">
          {/* Active ASAP Requests */}
          {mockASAPRequests.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Active Requests</CardTitle>
                <CardDescription>Friends looking to hang out right now</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockASAPRequests.map((request) => (
                  <div key={request.id} className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold">{request.userName}</span>
                          <Badge variant="outline">{request.activity}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{request.description}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(request.createdAt, { addSuffix: true })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {request.duration} min
                      </div>
                      {request.location && (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {request.location}
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">I'm in!</Button>
                      <Button size="sm" variant="outline" className="flex-1">Maybe later</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Create ASAP Request */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                Send ASAP Request
              </CardTitle>
              <CardDescription>
                Let friends know you're free to hang out right now
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What do you want to do?
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Grab coffee, Study together, Play basketball"
                  value={asapActivity}
                  onChange={(e) => setAsapActivity(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes)
                  </label>
                  <Input
                    type="number"
                    value={asapDuration}
                    onChange={(e) => setAsapDuration(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <Input
                    type="text"
                    placeholder="Where?"
                    value={asapLocation}
                    onChange={(e) => setAsapLocation(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Send to
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {mockFriends.slice(0, 4).map((friend) => (
                    <button
                      key={friend.id}
                      onClick={() => toggleFriend(friend.id)}
                      className={`flex items-center space-x-2 p-2 rounded-lg border transition-all ${
                        selectedFriends.includes(friend.id)
                          ? 'border-yellow-500 bg-yellow-50'
                          : 'border-gray-200 hover:border-yellow-300'
                      }`}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-sm">
                        {friend.avatar}
                      </div>
                      <span className="text-sm font-medium">{friend.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
              <Button
                onClick={sendASAPRequest}
                disabled={!asapActivity || selectedFriends.length === 0}
                className="w-full"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Request to {selectedFriends.length} Friend(s)
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Open Hours Tab */}
      {activeTab === 'open-hours' && (
        <div className="space-y-6">
          {/* Active Open Hours */}
          {mockOpenHours.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Friends' Open Hours</CardTitle>
                <CardDescription>See who's available for drop-in hangouts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockOpenHours.map((openHour) => (
                  <div key={openHour.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold">{openHour.userName}</span>
                          <Badge variant="outline">{openHour.activity}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{openHour.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {format(openHour.timeSlot.start, 'h:mm a')} - {format(openHour.timeSlot.end, 'h:mm a')}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {openHour.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {openHour.interestedFriends.length} interested
                      </div>
                    </div>
                    <Button size="sm" className="w-full">I'll drop by!</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Create Open Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-500" />
                Create Open Hours
              </CardTitle>
              <CardDescription>
                Let friends know when they can drop by
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What will you be doing?
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Gaming night, Study session, Movie marathon"
                  value={openHoursActivity}
                  onChange={(e) => setOpenHoursActivity(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time
                  </label>
                  <Input type="time" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time
                  </label>
                  <Input type="time" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <Input
                  type="text"
                  placeholder="Your dorm, apartment, etc."
                  value={openHoursLocation}
                  onChange={(e) => setOpenHoursLocation(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (optional)
                </label>
                <Input
                  type="text"
                  placeholder="Any additional details..."
                  value={openHoursDescription}
                  onChange={(e) => setOpenHoursDescription(e.target.value)}
                />
              </div>
              <Button
                onClick={createOpenHours}
                disabled={!openHoursActivity || !openHoursLocation}
                className="w-full"
              >
                <Clock className="w-4 h-4 mr-2" />
                Broadcast Open Hours
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
