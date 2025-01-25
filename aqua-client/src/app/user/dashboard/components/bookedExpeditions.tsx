"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

const bookedExpeditions = [
  { id: 1, title: "Deep Sea Adventure", date: "2023-08-15", price: 1500 },
  { id: 2, title: "Coral Reef Exploration", date: "2023-09-01", price: 1200 },
]
type TBookedExpeditions = { id: number; title: string; date: string; price: number; };
export default function BookedExpeditions() {
  const [selectedExpedition, setSelectedExpedition] = useState<TBookedExpeditions | null>(null)

  const handleRemoveBooking = () => {
    // Here you would typically send a request to your API to remove the booking
    console.log("Removing booking:", selectedExpedition)
    // Close the dialog after removing
    setSelectedExpedition(null)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Expedition</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookedExpeditions.map((expedition) => (
          <TableRow key={expedition.id}>
            <TableCell>{expedition.title}</TableCell>
            <TableCell>{expedition.date}</TableCell>
            <TableCell>${expedition.price}</TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" onClick={() => setSelectedExpedition(expedition)}>
                    Remove
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Remove Booking</DialogTitle>
                  </DialogHeader>
                  <p>Are you sure you want to remove the following booking?</p>
                  <p>
                    <strong>{selectedExpedition?.title}</strong>
                  </p>
                  <p>Date: {selectedExpedition?.date}</p>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={handleRemoveBooking}>
                      Confirm Removal
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

