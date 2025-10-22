import React, { useState } from 'react';
import { UserPlus, Calendar, MessageCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { mockFriends } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

export const Friends: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const filteredFriends = mockFriends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInvite = () => {
    // Simulate sending invite
    alert(`Invite sent to ${inviteEmail}!`);
    setInviteEmail('');
    setShowInviteModal(false);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Friends</h1>
          <p className="text-gray-600">Manage your Rally crew</p>
        </div>
        <Button onClick={() => setShowInviteModal(true)}>
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Friend
        </Button>
      </div>

      {/* Search */}
      <Input
        type="text"
        placeholder="Search friends..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full"
      />

      {/* Friends List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFriends.map((friend) => (
          <Card key={friend.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-3xl flex-shrink-0">
                  {friend.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg truncate">{friend.name}</h3>
                    <Badge variant={friend.calendarConnected ? 'success' : 'secondary'}>
                      {friend.calendarConnected ? 'Connected' : 'Pending'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{friend.email}</p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-purple-500" />
                      <span className="text-gray-600">Score: {friend.relationshipScore}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-600">
                        {friend.lastHangout 
                          ? formatDistanceToNow(friend.lastHangout, { addSuffix: true })
                          : 'Never'}
                      </span>
                    </div>
                  </div>

                  {/* Interests */}
                  {friend.preferences && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {friend.preferences.interests.slice(0, 3).map((interest) => (
                        <Badge key={interest} variant="outline" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                      {friend.preferences.interests.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{friend.preferences.interests.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Link to={`/hangouts/new?friend=${friend.id}`} className="flex-1">
                      <Button size="sm" className="w-full">
                        <Calendar className="w-3 h-3 mr-1" />
                        Plan Hangout
                      </Button>
                    </Link>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFriends.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <UserPlus className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600 mb-4">No friends found</p>
            <Button onClick={() => setShowInviteModal(true)}>
              Invite Your First Friend
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Invite a Friend</CardTitle>
              <CardDescription>
                Send them an invite to join Rally
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="email"
                placeholder="friend@college.edu"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleInvite}
                  disabled={!inviteEmail}
                  className="flex-1"
                >
                  Send Invite
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
