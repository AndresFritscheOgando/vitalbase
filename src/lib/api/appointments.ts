'use client'

import { useMutation, useQuery } from "@tanstack/react-query"
import type { Appointment } from "../types/appointment"

export const FETCH_APPOINTMENTS = "fetchAppointments"

const API_BASE = '/api/appointments'

export const useFetchAppointments = () => {
    return useQuery({
        queryKey: [FETCH_APPOINTMENTS],
        queryFn: async () => {
            const response = await fetch(API_BASE)
            if (!response.ok) {
                throw new Error('Failed to fetch appointments')
            }
            return response.json()
        },
    })
}

export const useCreateAppointment = () => {
    return useMutation({
        mutationFn: async (data: Partial<Appointment>) => {
            const response = await fetch(API_BASE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            if (!response.ok) {
                throw new Error('Failed to create appointment')
            }
            return response.json()
        },
    })
}

export const useUpdateAppointment = () => {
    return useMutation({
        mutationFn: async (data: Partial<Appointment>) => {
            if (!data.id) throw new Error('Appointment ID is required')
            const response = await fetch(`${API_BASE}/${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            if (!response.ok) {
                throw new Error('Failed to update appointment')
            }
            return response.json()
        },
    })
}

export const useDeleteAppointment = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`${API_BASE}/${id}`, {
                method: 'DELETE',
            })
            if (!response.ok) {
                throw new Error('Failed to delete appointment')
            }
            return response.json()
        },
    })
}