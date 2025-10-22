import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Sparkles, Calendar, Users, MapPin, Clock, Wand2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { mockFriends } from '@/data/mockData';
import { addDays, setHours, setMinutes, format } from 'date-fns';

export const CreateHangout: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedFriendId = searchParams.get('friend');

  const [mode, setMode] = useState<'ai' | 'manual'>('ai');
  const [selectedFriends, setSelectedFriends] = useState<string[]>(
    preselectedFriendId ? [preselectedFriendId] : []
  );
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('60');
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const toggleFriend = (friendId: string) => {
    setSelectedFriends(prev =>
      prev.includes(friendId)
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    );
  };

  const generateAISuggestions = () => {
    // Simulate AI suggestions
    const suggestions = [
      {
        id: 1,
        activity: 'Coffee & Study Session',
        time: setMinutes(setHours(addDays(new Date(), 1), 15), 0),
        duration: 90,
        location: 'Campus Café',
        reason: 'Based on mutual interest in studying and coffee',
        confidence: 95,
      },
      {
        id: 2,
        activity: 'Grab Dinner',
        time: setMinutes(setHours(addDays(new Date(), 2), 18), 30),
        duration: 60,
        location: 'Student Union Food Court',
        reason: 'Everyone is free and loves food!',
        confidence: 88,
      },
      {
        id: 3,
        activity: 'Basketball Game',
        time: setMinutes(setHours(addDays(new Date(), 3), 17), 0),
        duration: 120,
        location: 'Recreation Center',
        reason: 'Matches your sports interests',
        confidence: 82,
      },
    ];

    setAiSuggestions(suggestions);
    setShowSuggestions(true);
  };

  const confirmSuggestion = () => {
    alert(`Hangout confirmed! Invites sent to ${selectedFriends.length} friend(s)`);
    navigate('/hangouts');
  };

  const createManualHangout = () => {
    alert(`Manual hangout created! Invites sent to ${selectedFriends.length} friend(s)`);
    navigate('/hangouts');
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Create Hangout</h1>
        <p className="text-gray-600">Let AI help or plan it yourself</p>
      </div>

      {/* Mode Selection */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setMode('ai')}
          className={`p-6 rounded-xl border-2 transition-all ${
            mode === 'ai'
              ? 'border-purple-500 bg-purple-50'
              : 'border-gray-200 hover:border-purple-300'
          }`}
        >
          <Sparkles className={`w-8 h-8 mx-auto mb-2 ${mode === 'ai' ? 'text-purple-500' : 'text-gray-400'}`} />
          <h3 className="font-semibold mb-1">AI Advisor</h3>
          <p className="text-sm text-gray-600">Let AI suggest the perfect hangout</p>
        </button>
        <button
          onClick={() => setMode('manual')}
          className={`p-6 rounded-xl border-2 transition-all ${
            mode === 'manual'
              ? 'border-purple-500 bg-purple-50'
              : 'border-gray-200 hover:border-purple-300'
          }`}
        >
          <Calendar className={`w-8 h-8 mx-auto mb-2 ${mode === 'manual' ? 'text-purple-500' : 'text-gray-400'}`} />
          <h3 className="font-semibold mb-1">Manual Mode</h3>
          <p className="text-sm text-gray-600">Plan every detail yourself</p>
        </button>
      </div>

      {/* Select Friends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Who do you want to hang with?
          </CardTitle>
          <CardDescription>Select one or more friends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mockFriends.map((friend) => (
              <button
                key={friend.id}
                onClick={() => toggleFriend(friend.id)}
                className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all ${
                  selectedFriends.includes(friend.id)
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-2xl">
                  {friend.avatar}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold">{friend.name}</p>
                  <p className="text-xs text-gray-600">
                    {friend.preferences?.interests.slice(0, 2).join(', ')}
                  </p>
                </div>
                {!friend.calendarConnected && (
                  <Badge variant="outline" className="text-xs">No Calendar</Badge>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Mode */}
      {mode === 'ai' && selectedFriends.length > 0 && (
        <>
          {!showSuggestions ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Wand2 className="w-16 h-16 mx-auto mb-4 text-purple-500" />
                <h3 className="text-xl font-semibold mb-2">Ready to get suggestions?</h3>
                <p className="text-gray-600 mb-6">
                  Our AI will analyze calendars and preferences to find the perfect hangout
                </p>
                <Button onClick={generateAISuggestions} size="lg">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate AI Suggestions
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">AI Suggestions</h2>
                <Button variant="outline" size="sm" onClick={generateAISuggestions}>
                  Regenerate
                </Button>
              </div>
              {aiSuggestions.map((suggestion) => (
                <Card key={suggestion.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{suggestion.activity}</h3>
                        <p className="text-sm text-gray-600">{suggestion.reason}</p>
                      </div>
                      <Badge variant="success">{suggestion.confidence}% Match</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        <span>{format(suggestion.time, 'MMM d, h:mm a')}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span>{suggestion.duration} minutes</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm col-span-2">
                        <MapPin className="w-4 h-4 text-pink-500" />
                        <span>{suggestion.location}</span>
                      </div>
                    </div>
                    <Button onClick={confirmSuggestion} className="w-full">
                      Confirm & Send Invites
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      {/* Manual Mode */}
      {mode === 'manual' && selectedFriends.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Plan Your Hangout</CardTitle>
            <CardDescription>Fill in the details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activity
              </label>
              <Input
                type="text"
                placeholder="What do you want to do?"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date & Time
              </label>
              <Input type="datetime-local" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes)
              </label>
              <Input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <Input type="text" placeholder="Where?" />
            </div>
            <Button onClick={createManualHangout} className="w-full">
              Create & Send Invites
            </Button>
          </CardContent>
        </Card>
      )}

      {selectedFriends.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600">Select at least one friend to continue</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
