"use client"

import { useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import UserList from "./components/userList";
import ExpeditionList from "./components/expeditionList"
import ExpeditionAnalytics from "./components/expeditionAnalytics";
import CreateUserForm from "./components/createUserForm";
import CreateExpeditionForm from "./components/createExpeditionForm";
import { useQuery } from "@/components/shared/api"
import expeditionApiModule from "@/components/shared/api/modules/events"
import { LoadingSpinner } from "@/components/ui/loadingSpinner"

export default function AdminDashboard() {
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false)
  const [isExpeditionDialogOpen, setIsExpeditionDialogOpen] = useState(false)
  const { data: expeditions, isLoading, error } = useQuery({
    queryKey: ['expeditions'],
    queryFn: () => expeditionApiModule.read(),
  });
  if (isLoading) return <LoadingSpinner/>;
  if (error) return <div>Error: {error.message}</div>;
  if(expeditions)
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-8">Admin Dashboard</h1>

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

          <Dialog open={isExpeditionDialogOpen} onOpenChange={setIsExpeditionDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default">Create Expedition</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Expedition</DialogTitle>
              </DialogHeader>
              <CreateExpeditionForm onSuccess={() => setIsExpeditionDialogOpen(false)} />
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
            <ExpeditionList expeditions={expeditions}/>
          </TabsContent>
          <TabsContent value="analytics">
            <ExpeditionAnalytics />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

