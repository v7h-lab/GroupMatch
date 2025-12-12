import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, ArrowLeft, MapPin, UtensilsCrossed, DollarSign, Play, User, Calendar, Clock, ChevronDown, ChevronUp, Leaf } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

export interface Participant {
  id: string;
  initials: string;
  name: string;
  joined: boolean;
  isSelf?: boolean;
  isHost?: boolean;
}

interface WaitingViewProps {
  filters: {
    cuisine: string[];
    location: string[];
    cost: number[];
    dietary?: string[];
  };
  date?: string;
  time?: string;
  rating?: number;
  totalParticipants: number;
  isLoading?: boolean;
  onStart: (participants: Participant[]) => void;
  onBack: () => void;
  participants: Participant[];
  isHost?: boolean;
}

export function WaitingView({ filters, date, time, rating, totalParticipants, participants, isLoading, onStart, onBack, isHost }: WaitingViewProps) {
  // Generate placeholders for remaining spots
  const placeholders = Array(Math.max(0, totalParticipants - participants.length)).fill(null).map((_, i) => ({
    id: `placeholder-${i}`,
    initials: '',
    name: 'Waiting...',
    joined: false,
    isSelf: false,
    isHost: false
  }));

  const displayList = [...participants, ...placeholders];

  const joinedCount = participants.length;
  const progress = (joinedCount / totalParticipants) * 100;
  const canStart = !isLoading && joinedCount >= 2;

  const [isDetailsExpanded, setIsDetailsExpanded] = useState(true);

  // Auto-collapse when ready to start
  useEffect(() => {
    if (canStart) {
      setIsDetailsExpanded(false);
    }
  }, [canStart]);

  return (
    <div className="min-h-[100dvh] h-[100dvh] w-full bg-gray-50 flex flex-col overflow-hidden">
      <header className="p-4 shrink-0">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full hover:bg-gray-100">
          <ArrowLeft className="size-6 text-gray-600" />
        </Button>
      </header>

      <main className="flex-1 flex flex-col px-4 pb-4 max-w-md mx-auto w-full overflow-y-auto min-h-0">
        <div className="text-center mb-4 shrink-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {joinedCount < totalParticipants
              ? 'Waiting for friends...'
              : isLoading
                ? 'Loading Restaurants...'
                : 'Session Ready!'}
          </h2>
          <p className="text-gray-500">
            {joinedCount < totalParticipants
              ? `${joinedCount} of ${totalParticipants} people are ready`
              : isLoading
                ? 'Curating the best spots for you...'
                : "Everyone is here, let's go!"}
          </p>
        </div>

        {/* Session Details Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-4 overflow-hidden transition-all duration-300 shrink-0">
          <button
            onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
            className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${isDetailsExpanded ? 'border-b border-gray-100' : ''}`}
          >
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Session Details</h3>
            {isDetailsExpanded ? (
              <ChevronUp className="size-5 text-gray-400" />
            ) : (
              <ChevronDown className="size-5 text-gray-400" />
            )}
          </button>

          <AnimatePresence>
            {isDetailsExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div className="p-4 pb-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="size-5 text-red-500 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 mb-1">Location</div>
                      <div className="flex flex-wrap gap-1">
                        {filters.location.length > 0 ? (
                          filters.location.map(l => (
                            <Badge key={l} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100">
                              {l}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-gray-400 italic">Any</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <UtensilsCrossed className="size-5 text-red-500 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 mb-1">Cuisine</div>
                      <div className="flex flex-wrap gap-1">
                        {filters.cuisine.length > 0 ? (
                          filters.cuisine.map(c => (
                            <Badge key={c} variant="secondary" className="bg-red-50 text-red-700 border-red-100">
                              {c}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-gray-400 italic">Any</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {filters.dietary && filters.dietary.length > 0 && (
                    <div className="flex items-start gap-3">
                      <Leaf className="size-5 text-red-500 mt-0.5" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 mb-1">Dietary</div>
                        <div className="flex flex-wrap gap-1">
                          {filters.dietary.map(d => (
                            <Badge key={d} variant="secondary" className="bg-green-50 text-green-700 border-green-100">
                              {d}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <DollarSign className="size-5 text-red-500 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 mb-1">Price Range</div>
                      <div className="flex flex-wrap gap-1">
                        {filters.cost.length > 0 ? (
                          filters.cost.map(c => (
                            <Badge key={c} variant="secondary" className="bg-green-50 text-green-700 border-green-100">
                              {Array(c).fill('$').join('')}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-gray-400 italic">Any</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="size-5 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 mb-1">Minimum Rating</div>
                      {rating && rating > 0 ? (
                        <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 border-yellow-100">
                          {rating}+ Stars
                        </Badge>
                      ) : (
                        <span className="text-sm text-gray-400 italic">Any</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="size-5 text-red-500 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 mb-1">When</div>
                      {date || time ? (
                        <div className="flex flex-wrap gap-2">
                          {date && (
                            <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-100">
                              {(() => {
                                const [year, month, day] = date.split('-').map(Number);
                                const localDate = new Date(year, month - 1, day);
                                return localDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                              })()}
                            </Badge>
                          )}
                          {time && (
                            <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-100">
                              <Clock className="size-3 mr-1" />
                              {time}
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400 italic">Any</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Participants Grid */}
        <div className="mb-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 justify-items-center">
            {displayList.map((participant, idx) => (
              <motion.div
                key={participant.id}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold border-4 shadow-sm transition-all
                  ${participant.joined
                    ? 'bg-white border-green-500 text-gray-900'
                    : 'bg-gray-100 border-gray-200 text-gray-300 border-dashed'
                  }
                  ${participant.isSelf ? 'border-red-500' : ''}
                `}>
                  {participant.joined ? (
                    participant.initials
                  ) : (
                    <User className="size-6 opacity-50" />
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <span className={`text-xs font-medium text-center max-w-[4rem] truncate ${participant.joined ? 'text-gray-700' : 'text-gray-400'}`}>
                    {participant.name}
                  </span>
                  {participant.isHost && (
                    <span className="text-xs font-medium text-gray-500">
                      (Host)
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Action */}
        <div className="mt-auto px-4 py-4">
          {/* Progress Bar */}
          {joinedCount < totalParticipants && (
            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden mb-6">
              <motion.div
                className="h-full bg-green-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}

          <Button
            className="w-full h-14 text-lg font-semibold bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-200 rounded-xl gap-2"
            onClick={() => onStart(displayList.filter(p => p.joined))}
            disabled={isLoading || (joinedCount < 2 && totalParticipants > 1) || (isHost === false)}
          >
            <Play className="size-5 fill-current" />
            {isLoading ? 'Loading Restaurants...' : (isHost === false ? 'Waiting for Host...' : (joinedCount === totalParticipants ? 'Start Swiping!' : 'Start Now Anyway'))}
          </Button>
          {joinedCount < totalParticipants && (
            <p className="text-center text-xs text-gray-400 mt-3">
              Waiting for everyone gives the best results
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
