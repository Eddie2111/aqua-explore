'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { TExpedition } from '@/components/shared/api/modules/events/events.types';
import { useLocalStorage } from '@/utils/localStorage';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import expeditionApiModule from '@/components/shared/api/modules/events';
import { useWebsocket } from '@/components/shared/sockets/useWebsocket';

export default function AvailableExpeditions({
  expeditions,
}: {
  expeditions: TExpedition[];
}) {
  const { getLocalStorage } = useLocalStorage();
  const user_id = getLocalStorage('id') ?? '';
  const [selectedExpedition, setSelectedExpedition] =
    useState<TExpedition | null>(null);
  const [searchParams, setSearchParams] = useState<string>('');
  const [searchResults, setSearchResults] = useState<TExpedition[] | null>(
    null,
  );
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const socket = useWebsocket({ path: '/', autoConnect: true });
  const bookingMutation = useMutation({
    mutationFn: async ({
      expeditionId,
      participantId,
    }: {
      expeditionId: string;
      participantId: string;
    }) => {
      if (!expeditionId || !participantId) {
        throw new Error('Missing expedition or participant ID');
      }
      return expeditionApiModule.booking(expeditionId, participantId);
    },
    onSuccess: () => {
      toast.success('Expedition booked successfully!');
      setSelectedExpedition(null);
      setIsBookingModalOpen(false);
      if (socket) {
        socket.emit('createNotification', {
          userId: user_id,
          expedition: selectedExpedition,
          type: 'booked',
        });
      }
    },
    onError: (error: Error) => {
      toast.error(`Booking failed: ${error.message}`);
      console.error('Booking error:', error);
    },
  });

  const searchMutation = useMutation({
    mutationFn: async (params: string) => expeditionApiModule.search(params),
    onSuccess: (data: TExpedition[]) => {
      setSearchResults(data);
      toast.success('Search completed!');
      setIsSearchModalOpen(false);
      socket.emit('createNotification', {
        userId: user_id,
        expedition: selectedExpedition,
      });
    },
    onError: (error: Error) => {
      toast.error(`Search failed: ${error.message}`);
      console.error('Search error:', error);
    },
  });

  const handleBooking = () => {
    if (selectedExpedition && user_id) {
      bookingMutation.mutate({
        expeditionId: selectedExpedition._id ?? '',
        participantId: user_id,
      });
    } else {
      toast.error('Invalid user or expedition details.');
    }
  };

  const handleSearch = () => {
    if (!searchParams.trim()) {
      toast.error('Search query cannot be empty.');
      return;
    }
    searchMutation.mutate(searchParams);
  };

  const displayExpeditions = searchResults || expeditions;

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Available Expeditions</h2>
        <Dialog open={isSearchModalOpen} onOpenChange={setIsSearchModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Search Expeditions</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Search Expeditions</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col">
                <Label htmlFor="search" className="text-left text-lg">
                  Expedition name or location
                </Label>
                <Input
                  id="search"
                  value={searchParams}
                  onChange={(e) => setSearchParams(e.target.value)}
                  placeholder="Enter expedition name or location"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleSearch}
                disabled={searchMutation.status === 'pending'}
              >
                {searchMutation.status === 'pending' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  'Search'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayExpeditions.map((expedition) => (
          <Card key={expedition._id}>
            <CardHeader>
              <CardTitle>{expedition.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{expedition.description}</p>
              <p className="mt-2">
                Date: {new Date(expedition.expeditionDate).toLocaleDateString()}
              </p>
              <p>Location: {expedition.expeditionLocation}</p>
            </CardContent>
            <CardFooter>
              <Dialog
                open={isBookingModalOpen}
                onOpenChange={setIsBookingModalOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      setSelectedExpedition(expedition);
                      setIsBookingModalOpen(true);
                    }}
                  >
                    Book Now
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Book Expedition</DialogTitle>
                  </DialogHeader>
                  <p>Are you sure you want to book the following expedition?</p>
                  <p>
                    <strong>{selectedExpedition?.name}</strong>
                  </p>
                  <p>
                    Date:{' '}
                    {selectedExpedition &&
                      new Date(
                        selectedExpedition.expeditionDate,
                      ).toLocaleDateString()}
                  </p>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        disabled={bookingMutation.status === 'pending'}
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      onClick={handleBooking}
                      disabled={bookingMutation.status === 'pending'}
                    >
                      {bookingMutation.status === 'pending' ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Booking...
                        </>
                      ) : (
                        'Confirm Booking'
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
