import type { Appointment} from '@/lib/types/appointment'
import type { Prescription} from './prescription'

export interface Patient {
    id: string;
    name: string;
    age: number;
    gender: string;
    contactInfo: string;
    history?: string | null;
    appointments: Appointment;
    prescriptions: Prescription;
    createdAt: Date;
    updatedAt: Date;
  }
  
 
