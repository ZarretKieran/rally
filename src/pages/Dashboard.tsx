import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Sparkles, Zap, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockHangouts, mockFriends, mockASAPRequests } from '@/data/mockData';
import { format, formatDistanceToNow } from 'date-fns';

export const Dashboard: React.FC = () => {
  const upcomingHangouts = mockHangouts.filter(h => h.status === 'confirmed' || h.status === 'pending');
  const pendingRequests = mockASAPRequests.filter(r => 
    r.responses.some(res => res.userId === 'user-1' && res.status === 'pending')
  );
  
  const friendsNeedingAttention = mockFriends
    .filter(f => f.lastHangout && (new Date().getTime() - new Date(f.lastHangout).getTime()) / (1000 * 60 * 60 * 24) > 10)
    .slice(0, 3);

  return (
    <div className="space-y-6 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Hey there! 👋</h1>
        <p className="text-purple-100 mb-6">Ready to rally with your friends?</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/hangouts/new">
            <Button className="w-full bg-white text-purple-600 hover:bg-purple-50">
              <Sparkles className="w-4 h-4 mr-2" />
              AI Advisor
            </Button>
          </Link>
          <Link to="/spontaneous/asap">
            <Button className="w-full bg-white text-purple-600 hover:bg-purple-50">
              <Zap className="w-4 h-4 mr-2" />
              Who's Free?
            </Button>
          </Link>
          <Link to="/spontaneous/open-hours">
            <Button className="w-full bg-white text-purple-600 hover:bg-purple-50">
              <Clock className="w-4 h-4 mr-2" />
              Open Hours
            </Button>
          </Link>
        </div>
      </div>

      {/* Pending ASAP Requests */}
      {pendingRequests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-500" />
              Spontaneous Hangout Requests
            </CardTitle>
            <CardDescription>Your friends want to hang out now!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold">{request.userName}</span>
                      <Badge variant="outline">{request.activity}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{request.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDistanceToNow(request.createdAt, { addSuffix: true })}
                    </p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button size="sm" variant="default">I'm in!</Button>
                    <Button size="sm" variant="outline">Pass</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Hangouts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-purple-500" />
                Upcoming Hangouts
              </CardTitle>
              <CardDescription>Your scheduled and suggested hangouts</CardDescription>
            </div>
            <Link to="/hangouts">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {upcomingHangouts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No upcoming hangouts yet</p>
              <Link to="/hangouts/new">
                <Button className="mt-4">Plan Your First Hangout</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingHangouts.map((hangout) => (
                <div key={hangout.id} className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-lg">{hangout.title}</h4>
                      <p className="text-sm text-gray-600">{hangout.activity}</p>
                    </div>
                    <Badge variant={hangout.status === 'confirmed' ? 'success' : 'secondary'}>
                      {hangout.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {hangout.confirmedTime && format(hangout.confirmedTime.start, 'MMM d, h:mm a')}
                      {hangout.suggestedTime && format(hangout.suggestedTime.start, 'MMM d, h:mm a')}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {hangout.participants.length} {hangout.participants.length === 1 ? 'person' : 'people'}
                    </div>
                  </div>
                  {hangout.location && (
                    <p className="text-sm text-gray-600 mt-2">📍 {hangout.location}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Friends Needing Attention */}
      {friendsNeedingAttention.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
              Stay Connected
            </CardTitle>
            <CardDescription>You haven't hung out with these friends in a while</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {friendsNeedingAttention.map((friend) => (
                <div key={friend.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-2xl">
                      {friend.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{friend.name}</p>
                      <p className="text-sm text-gray-600">
                        Last hangout: {friend.lastHangout && formatDistanceToNow(friend.lastHangout, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <Link to={`/hangouts/new?friend=${friend.id}`}>
                    <Button size="sm">Plan Hangout</Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <p className="text-2xl font-bold">{mockFriends.length}</p>
              <p className="text-sm text-gray-600">Friends</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <p className="text-2xl font-bold">{upcomingHangouts.length}</p>
              <p className="text-sm text-gray-600">Upcoming</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-pink-500" />
              <p className="text-2xl font-bold">
                {mockFriends.reduce((sum, f) => sum + f.relationshipScore, 0) / mockFriends.length}
              </p>
              <p className="text-sm text-gray-600">Avg Score</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <p className="text-2xl font-bold">{pendingRequests.length}</p>
              <p className="text-sm text-gray-600">Requests</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
