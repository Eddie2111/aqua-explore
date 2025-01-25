"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CreateExpeditionFormProps {
  onSuccess: () => void
}

export default function CreateExpeditionForm({ onSuccess }: CreateExpeditionFormProps) {
  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [capacity, setCapacity] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating expedition:", { name, date, capacity: Number.parseInt(capacity) })
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Expedition Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="capacity">Capacity</Label>
        <Input id="capacity" type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} required />
      </div>
      <Button type="submit">Create Expedition</Button>
    </form>
  )
}

