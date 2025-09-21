import { db } from "@/server/db"
import { useMutation, useQuery } from "@tanstack/react-query"
import type { Prescription } from "../types/prescription"

export const FETCH_PRESCRIPTIONS = "fetchPrescriptions"

export const fetchPrescriptions = async () => await db.prescription.findMany()

export const useFetchPrescriptions = () => {
    const query = useQuery({
        queryKey: [FETCH_PRESCRIPTIONS],
        queryFn: async () => await fetchPrescriptions(),
    })
    return {
        ...query,
        data: query.data,
        payload: query.data,
    }
}

export const useCreatePrescription = () => {
    return useMutation({
        mutationFn: async (data: Partial<Prescription>) => 
            await db.prescription.create({ 
                data: {
                    medication: data.medication || "",
                    dosage: data.dosage || "",
                    notes: data.notes || "",
                    patientId: data.patientId || "",
                    doctorId: data.doctorId || "",
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                }
            }),
    })
}

export const useUpdatePrescription = () => {
    return useMutation({
        mutationFn: async (data: Partial<Prescription>) => 
            await db.prescription.update({ 
                where: { id: data.id }, 
                data: {
                    medication: data.medication || "",
                    dosage: data.dosage || "",
                    notes: data.notes || "",
                    patientId: data.patientId || "",
                    doctorId: data.doctorId || "",
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                } 
            }),
    })
}

export const useDeletePrescription = () => {
    return useMutation({
        mutationFn: async (id:string) => await db.prescription.delete({ where: { id } }),
    })
}