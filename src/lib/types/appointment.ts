import type { Patient } from "./patient";
import type { Doctor } from "./doctor";

export interface Appointment {
    id: string;
    date: Date;
    reason: string;
    patientId: string;
    doctorId: string;
    patient: Patient;
    doctor: Doctor;
    createdAt: Date;
    updatedAt: Date;
  }