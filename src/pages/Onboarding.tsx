import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [calendarConnected, setCalendarConnected] = useState(false);

  const interests = [
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

  const handleConnectCalendar = () => {
    // Simulate calendar connection
    setTimeout(() => {
      setCalendarConnected(true);
    }, 1000);
  };

  const handleComplete = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-3xl font-bold">R</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Rally
            </h1>
          </div>
          <p className="text-xl text-gray-600">The effortless way to make hangouts happen</p>
        </div>

        {/* Step 1: Welcome & Name */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Rally! 👋</CardTitle>
              <CardDescription>Let's get you set up in just a few steps</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What's your name?
                </label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button
                onClick={() => setStep(2)}
                disabled={!name.trim()}
                className="w-full"
              >
                Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Interests */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>What are you into? ✨</CardTitle>
              <CardDescription>
                Select your interests so we can suggest better hangouts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedInterests.includes(interest)
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={selectedInterests.length === 0}
                  className="flex-1"
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Calendar Integration */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Connect Your Calendar 📅</CardTitle>
              <CardDescription>
                We'll use your calendar to find free time with friends
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!calendarConnected ? (
                <div className="text-center py-8">
                  <Calendar className="w-20 h-20 mx-auto text-purple-500 mb-4" />
                  <p className="text-gray-600 mb-6">
                    Connect your Google Calendar to get started
                  </p>
                  <Button onClick={handleConnectCalendar} className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Connect Google Calendar
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-20 h-20 mx-auto text-green-500 mb-4" />
                  <p className="text-gray-600 mb-6">
                    Calendar connected successfully! ✅
                  </p>
                </div>
              )}
              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Back
                </Button>
                <Button
                  onClick={handleComplete}
                  disabled={!calendarConnected}
                  className="flex-1"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Let's Rally!
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2 mt-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 w-12 rounded-full transition-colors ${
                s <= step ? 'bg-purple-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
