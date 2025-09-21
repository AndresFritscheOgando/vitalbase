'use client'
import React from 'react'
import { format } from 'date-fns'
import { Calendar, Edit, Eye } from 'lucide-react'
import AppointmentModal from './AppointmentModal'
import type { appointmentView } from './AppointmentModal'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useFetchAppointments } from '@/lib/api/appointments'
import type { Appointment } from '@/lib/types/appointment'

const AppointmentsPage = () => {
  const [view, setView] = React.useState<appointmentView>(undefined)
  const appointmentsRequest = useFetchAppointments()
  const closeModal = () => setView(undefined)
  const onClose = () => setView(undefined)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">
            Manage and schedule patient appointments
          </p>
        </div>
        <Button onClick={() => setView('create')} className="gap-2">
          <Calendar className="h-4 w-4" />
          New Appointment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>
                {appointmentsRequest.data?.length || 0} appointments found
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[200px]">Date & Time</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointmentsRequest.data?.map((appointment: Appointment) => (
                  <TableRow key={appointment.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{format(new Date(appointment.date), 'MMM d, yyyy')}</span>
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(appointment.date), 'h:mm a')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{appointment.patient.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {appointment.patient.contactInfo}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{appointment.doctor.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {appointment.doctor.speciality}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="whitespace-normal text-left">
                        {appointment.reason}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setView('show')}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AppointmentModal 
        open={!!view} 
        onOpenChange={() => setView(undefined)} 
        onClose={onClose} 
        view={view} 
        initialData={appointmentsRequest.data} 
      />
    </div>
  )
}

export default AppointmentsPage