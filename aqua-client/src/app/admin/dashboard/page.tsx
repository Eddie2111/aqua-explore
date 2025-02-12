'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import UserList from './components/userList';
import ExpeditionList from './components/expeditionList';
import ExpeditionAnalytics from './components/expeditionAnalytics';
import CreateUserForm from './components/createUserForm';
import CreateExpeditionForm from './components/createExpeditionForm';
import { useQuery } from '@/components/shared/api';
import expeditionApiModule from '@/components/shared/api/modules/events';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import { Bell } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useWebsocket } from '@/components/shared/sockets/useWebsocket';
import { TExpedition } from '@/components/shared/api/modules/events/events.types';

export default function AdminDashboard() {
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isExpeditionDialogOpen, setIsExpeditionDialogOpen] = useState(false);
  const [isNotificationsDialogOpen, setIsNotificationsDialogOpen] =
    useState(false);

  // Notifications state
  const [notifications, setNotifications] = useState<
    { title: string; message: string; date: string }[]
  >([]);

  // Initialize WebSocket connection
  const socket = useWebsocket({ path: '/', autoConnect: true });

  useEffect(() => {
    // Listen for 'adminNotification' events
    socket.on(
      'getNotification',
      (data: { userId: string; expedition: TExpedition; type: string }) => {
        console.log(data);
        const newNotification = {
          title: data.type,
          message: `user id ${data.userId} booked ${data.expedition.name}`,
          date: new Date().toLocaleString(), // Add timestamp
        };

        // Update notifications state
        setNotifications((prev) => [newNotification, ...prev]);
      },
    );

    // Cleanup WebSocket listener on unmount
    return () => {
      socket.off('getNotification');
    };
  }, [socket]);

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
            Admin Dashboard
          </h1>

          <div className="mb-6 space-x-4">
            <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default">Create User</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New User</DialogTitle>
                </DialogHeader>
                <CreateUserForm onSuccess={() => setIsUserDialogOpen(false)} />
              </DialogContent>
            </Dialog>

            <Dialog
              open={isExpeditionDialogOpen}
              onOpenChange={setIsExpeditionDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="default">Create Expedition</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Expedition</DialogTitle>
                </DialogHeader>
                <CreateExpeditionForm
                  onSuccess={() => setIsExpeditionDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>

            <Dialog
              open={isNotificationsDialogOpen}
              onOpenChange={setIsNotificationsDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Notifications</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[300px] pr-4">
                  {notifications.map((notification, index) => (
                    <div
                      key={index}
                      className="mb-4 p-2 bg-gray-100 rounded-md"
                    >
                      <p className="font-semibold">{notification.title}</p>
                      <p className="text-sm text-gray-600">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.date}
                      </p>
                    </div>
                  ))}
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="users">
            <TabsList>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="expeditions">Expeditions</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="users">
              <UserList />
            </TabsContent>
            <TabsContent value="expeditions">
              <ExpeditionList expeditions={expeditions} />
            </TabsContent>
            <TabsContent value="analytics">
              <ExpeditionAnalytics />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    );
}
