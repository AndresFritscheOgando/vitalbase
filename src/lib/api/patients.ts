import { db } from "@/server/db"
import { useMutation, useQuery } from "@tanstack/react-query"
import type { Patient } from "../types/patient"

export const FETCH_PATIENTS = "fetchPatients"

export const fetchPatients = async () => await db.patient.findMany()

export const useFetchPatients = () => {
    const query = useQuery({
        queryKey: [FETCH_PATIENTS],
        queryFn: async () => await fetchPatients(),
    })
    return {
        ...query,
        data: query.data,
        payload: query.data,
    }
}

export const useCreatePatient = () => {
    return useMutation({
        mutationFn: async (data: Partial<Patient>) => 
            await db.patient.create({ 
                data: {
                    name: data.name || "",
                    age: data.age || 0,
                    gender: data.gender || "",
                    contactInfo: data.contactInfo || "",
                    history: data.history || "",
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                }
            }),
    })
}

export const useUpdatePatient = () => {
    return useMutation({
        mutationFn: async (data: Partial<Patient>) => 
            await db.patient.update({ 
                where: { id: data.id }, 
                data: {
                    name: data.name || "",
                    age: data.age || 0,
                    gender: data.gender || "",
                    contactInfo: data.contactInfo || "",
                    history: data.history || "",
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                } 
            }),
    })
}

export const useDeletePatient = () => {
    return useMutation({
        mutationFn: async (id:string) => await db.patient.delete({ where: { id } }),
    })
}
