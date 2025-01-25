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
import { TExpedition } from '@/components/shared/api/modules/events/events.types';

export default function AvailableExpeditions({
  expeditions,
}: {
  expeditions: TExpedition[];
}) {
  const [selectedExpedition, setSelectedExpedition] =
    useState<TExpedition | null>(null);

  const handleBooking = () => {
    console.log('Booking expedition:', selectedExpedition);
    setSelectedExpedition(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {expeditions.map((expedition) => (
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
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={() => setSelectedExpedition(expedition)}>
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
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleBooking}>Confirm Booking</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
