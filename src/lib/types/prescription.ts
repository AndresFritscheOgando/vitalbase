import type { Patient } from "./patient";
import type { Doctor } from "./doctor"; 

export type Prescription = {
    id: string,
    medication: string,
    dosage: string,
    notes: string,
    patient: Patient,
    patientId: string,
    doctor: Doctor,
    doctorId:string
    createdAt: Date;
    updatedAt: Date;
}