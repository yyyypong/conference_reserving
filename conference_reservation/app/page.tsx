'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock, Users } from 'lucide-react'

type Reservation = {
  id: number
  room: string
  date: string
  time: string
  name: string
}

export default function ConferenceRoomReservation() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [room, setRoom] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newReservation: Reservation = {
      id: Date.now(),
      room,
      date,
      time,
      name
    }
    setReservations([...reservations, newReservation])
    setRoom('')
    setDate('')
    setTime('')
    setName('')
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Conference Room Reservation</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Make a Reservation</CardTitle>
            <CardDescription>Fill out the form to reserve a conference room.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="room">Room</Label>
                  <Select value={room} onValueChange={setRoom} required>
                    <SelectTrigger id="room">
                      <SelectValue placeholder="Select a room" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="room-a">Room A</SelectItem>
                      <SelectItem value="room-b">Room B</SelectItem>
                      <SelectItem value="room-c">Room C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Reserve Room</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Reservations</CardTitle>
            <CardDescription>List of all current room reservations.</CardDescription>
          </CardHeader>
          <CardContent>
            {reservations.length === 0 ? (
              <p className="text-center text-gray-500">No reservations yet.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {reservations.map((reservation) => (
                  <li key={reservation.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <span className="inline-block h-8 w-8 rounded-full bg-gray-200 text-gray-600 text-center leading-8">
                          {reservation.room.charAt(reservation.room.length - 1)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {reservation.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {reservation.date} at {reservation.time}
                        </p>
                      </div>
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {reservation.room.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}