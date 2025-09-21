import { useForm } from "react-hook-form"
import type { Appointment } from "@/lib/types/appointment"

export default function Form({onSubmit}: {onSubmit: (data: Appointment) => void}) {
    const { register, handleSubmit } = useForm<Appointment>()
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register('reason')} />
            <input type="text" {...register('date')} />
            <input type="text" {...register('patient.id')} />
            <input type="text" {...register('doctor.id')} />
            <button type="submit">Submit</button>
        </form>
    )
}