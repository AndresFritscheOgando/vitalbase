import type { Appointment } from "./appointment";
import type { Prescription } from "./prescription";

export interface Doctor {
    id: string;
    name: string;
    speciality: string;
    email: string;
    password: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    appointments: Appointment;
    prescriptions: Prescription;
}