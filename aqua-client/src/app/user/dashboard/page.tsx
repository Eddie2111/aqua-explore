'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AvailableExpeditions from './components/availableExpeditions';
import BookedExpeditions from './components/bookedExpeditions';
import AllExpeditions from './components/allExpeditions';
import { useQuery } from '@/components/shared/api';
import expeditionApiModule from '@/components/shared/api/modules/events/events.api';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';

export default function UserDashboard() {
  const {
    data: expeditions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['expeditions'],
    queryFn: () => expeditionApiModule.read(),
  });
  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error.message}</div>;
  if (expeditions)
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-8">
            User Dashboard
          </h1>

          <Tabs defaultValue="available">
            <TabsList>
              <TabsTrigger value="available">Available Expeditions</TabsTrigger>
              <TabsTrigger value="booked">Booked Expeditions</TabsTrigger>
              <TabsTrigger value="all">All Expeditions</TabsTrigger>
            </TabsList>
            <TabsContent value="available">
              <AvailableExpeditions
                expeditions={expeditions?.filter(
                  (expedition) => expedition.expeditionStatus === 'PLANNED',
                )}
              />
            </TabsContent>
            <TabsContent value="booked">
              <BookedExpeditions />
            </TabsContent>
            <TabsContent value="all">
              <AllExpeditions expeditions={expeditions} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    );
}
