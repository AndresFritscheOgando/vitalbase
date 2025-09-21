import { db } from "@/server/db"
import { useMutation, useQuery } from "@tanstack/react-query"
import type { Doctor } from "../types/doctor"

export type DoctorParamsProps = {
    page?: number;
    limit?: number;
    search?: string;
}

export const FETCH_DOCTORS = "fetchDoctors"

export const fetchDoctors = async () => await db.doctor.findMany()

export const useFetchDoctors = () => {
    const query = useQuery({
        queryKey: [FETCH_DOCTORS],
        queryFn: async () => await fetchDoctors(),
    })
    return {
        ...query,
        data: query.data,
        payload: query.data,
    }
}


export const useCreateDoctor = () => {
    return useMutation({
        mutationFn: async (data: Partial<Doctor>) => 
            await db.doctor.create({ 
                data: {
                    name: data.name || "",
                    speciality: data.speciality || "",
                    email: data.email || "",
                    password: data.password || "",
                    phone: data.phone || "",
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                }
            }),
    })
}

export const useUpdateDoctor = () => {
    return useMutation({
        mutationFn: async (data: Partial<Doctor>) => 
            await db.doctor.update({ 
                where: { id: data.id }, 
                data: {
                    name: data.name || "",
                    speciality: data.speciality || "",
                    email: data.email || "",
                    password: data.password || "",
                    phone: data.phone || ""                     ,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                } 
            }),
    })
}

export const useDeleteDoctor = () => {
    return useMutation({
        mutationFn: async (id:string) => await db.doctor.delete({ where: { id } }),
    })
}