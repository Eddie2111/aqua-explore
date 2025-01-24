"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const expeditions = [
  { id: 1, name: "Deep Sea Adventure", date: "2023-08-15", capacity: 10, booked: 5 },
  { id: 2, name: "Coral Reef Exploration", date: "2023-09-01", capacity: 8, booked: 3 },
  { id: 3, name: "Underwater Volcano Tour", date: "2023-09-15", capacity: 6, booked: 6 },
]

export default function ExpeditionList() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 bg-blue-600 text-white p-2 rounded-md">Expedition List</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Booked</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expeditions.map((expedition) => (
            <TableRow key={expedition.id}>
              <TableCell>{expedition.name}</TableCell>
              <TableCell>{expedition.date}</TableCell>
              <TableCell>{expedition.capacity}</TableCell>
              <TableCell>{expedition.booked}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

