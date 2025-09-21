import { db } from "@/server/db"
import { useMutation, useQuery } from "@tanstack/react-query"
import type { Appointment } from "../types/appointment"

export const FETCH_APPOINTMENTS = "fetchAppointments"

export const fetchAppointments = async () => await db.appointment.findMany()

export const useFetchAppointments = () => {
    const query = useQuery({
        queryKey: [FETCH_APPOINTMENTS],
        queryFn: async () => await fetchAppointments(),
    })
    return {
        ...query,
        data: query.data,
        payload: query.data,
    }
}

export const useCreateAppointment = () => {
    return useMutation({
        mutationFn: async (data: Partial<Appointment>) => 
            await db.appointment.create({ 
                data: {
                    date: data.date || new Date(),
                    reason: data.reason || "",
                    patientId: data.patientId || "",
                    doctorId: data.doctorId || "",
                    createdAt: data.createdAt || new Date(),
                    updatedAt: data.updatedAt || new Date(),
                }
            }),
    })
}

export const useUpdateAppointment = () => {
    return useMutation({
        mutationFn: async (data: Partial<Appointment>) => 
            await db.appointment.update({ 
                where: { id: data.id }, 
                data: {
                    date: data.date || new Date(),
                    reason: data.reason || "",
                    patientId: data.patientId || "",
                    doctorId: data.doctorId || "",
                    createdAt: data.createdAt || new Date(),
                    updatedAt: data.updatedAt || new Date(),
                } 
            }),
    })
}

export const useDeleteAppointment = () => {
    return useMutation({
        mutationFn: async (id:string) => await db.appointment.delete({ where: { id } }),
    })
}