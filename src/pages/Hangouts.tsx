import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, MapPin, Clock, Plus, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockHangouts } from '@/data/mockData';
import { format } from 'date-fns';

export const Hangouts: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const filteredHangouts = mockHangouts.filter(hangout => {
    if (filter === 'upcoming') {
      return hangout.status === 'confirmed' || hangout.status === 'pending' || hangout.status === 'suggested';
    }
    if (filter === 'past') {
      return hangout.status === 'completed' || hangout.status === 'cancelled';
    }
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'secondary';
      case 'suggested':
        return 'outline';
      case 'completed':
        return 'default';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Hangouts</h1>
          <p className="text-gray-600">All your past and upcoming hangouts</p>
        </div>
        <Link to="/hangouts/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Hangout
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <div className="flex space-x-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'upcoming' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('upcoming')}
          >
            Upcoming
          </Button>
          <Button
            variant={filter === 'past' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('past')}
          >
            Past
          </Button>
        </div>
      </div>

      {/* Hangouts List */}
      {filteredHangouts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600 mb-4">No hangouts found</p>
            <Link to="/hangouts/new">
              <Button>Create Your First Hangout</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredHangouts.map((hangout) => (
            <Card key={hangout.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-semibold">{hangout.title}</h3>
                      <Badge variant={getStatusColor(hangout.status) as any}>
                        {hangout.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{hangout.activity}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    <span>
                      {hangout.confirmedTime && format(hangout.confirmedTime.start, 'MMM d, yyyy')}
                      {hangout.suggestedTime && format(hangout.suggestedTime.start, 'MMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>
                      {hangout.confirmedTime && format(hangout.confirmedTime.start, 'h:mm a')}
                      {hangout.suggestedTime && format(hangout.suggestedTime.start, 'h:mm a')}
                    </span>
                  </div>
                  {hangout.location && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-pink-500" />
                      <span>{hangout.location}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-green-500" />
                    <span>{hangout.participants.length} participant(s)</span>
                  </div>
                </div>

                {/* Participants */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm text-gray-600">With:</span>
                  <div className="flex -space-x-2">
                    {hangout.participants.map((participant) => (
                      <div
                        key={participant.id}
                        className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-sm border-2 border-white"
                        title={participant.name}
                      >
                        {participant.avatar}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {hangout.participants.map(p => p.name).join(', ')}
                  </span>
                </div>

                {/* Actions */}
                {hangout.status === 'suggested' && (
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">Accept</Button>
                    <Button size="sm" variant="outline" className="flex-1">Modify</Button>
                    <Button size="sm" variant="destructive" className="flex-1">Decline</Button>
                  </div>
                )}
                {hangout.status === 'pending' && (
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">Confirm</Button>
                    <Button size="sm" variant="outline" className="flex-1">Reschedule</Button>
                  </div>
                )}
                {hangout.status === 'confirmed' && (
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">View Details</Button>
                    <Button size="sm" variant="outline" className="flex-1">Add to Calendar</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
