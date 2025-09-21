'use client'

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Appointment } from "@/lib/types/appointment"

interface AppointmentModalProps {
    onClose: () => void
    open: boolean
    onOpenChange: (open: boolean) => void
    initialData?: Appointment[]
    view: appointmentView
}

export type appointmentView = 'create' | 'edit' | 'show' | undefined

export default function AppointmentModal({ open, onOpenChange, initialData, onClose }: AppointmentModalProps) {
    return (
        <Dialog open={open} onOpenChange={() => onClose()}>
            <DialogTrigger asChild>
                <Button variant="outline">Create Appointment</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Appointment</DialogTitle>
                    <DialogDescription>
                        Fill the form to create a new appointment
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" onClick={() => onClose()}>Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant="default" onClick={() => onClose()}>Create</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}